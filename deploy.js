import { connect } from "@dagger.io/dagger";

const vars = [
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_DEFAULT_REGION",
  "AWS_BUCKET_NAME",
];
vars.forEach((v) => {
  if (!process.env[v]) {
    console.log(`${v} variable must be set`);
    process.exit();
  }
});

connect(
  async (client) => {
    let awsAccessKeyId = client.setSecret(
      "awsAccessKeyId",
      process.env["AWS_ACCESS_KEY_ID"]
    );
    let awsSecretAccessKey = client.setSecret(
      "awsSecretAccessKey",
      process.env["AWS_SECRET_ACCESS_KEY"]
    );
    let awsRegion = process.env["AWS_DEFAULT_REGION"];

    // get reference to the local project
    const source = client
      .host()
      .directory(".", { exclude: ["node_modules/", "dist/"] });

    // lint and build
    const appRunner = client
      .container()
      .from("node:20")
      .withDirectory("/app", source)
      .withWorkdir("/app")
      .withExec(["npm", "install"])
      .withExec(["npm", "run", "lint"])
      .withExec(["npm", "run", "build"]);

    // upload build files to S3
    await client
      .container()
      .from("amazon/aws-cli:2.11.22")
      .withSecretVariable("AWS_ACCESS_KEY_ID", awsAccessKeyId)
      .withSecretVariable("AWS_SECRET_ACCESS_KEY", awsSecretAccessKey)
      .withEnvVariable("AWS_DEFAULT_REGION", awsRegion)
      .withDirectory("/tmp/dist", appRunner.directory("dist"))
      .withExec([
        "s3",
        "cp",
        "/tmp/dist/index.html",
        process.env["AWS_BUCKET_NAME"],
        "--cache-control",
        "public,max-age=60,stale-while-revalidate=86400",
      ])
      .withExec([
        "s3",
        "cp",
        "/tmp/dist",
        process.env["AWS_BUCKET_NAME"],
        "--recursive",
        "--exclude",
        "index.html",
        "--cache-control",
        "public,max-age=31536000,immutable",
      ])
      .stdout();
  },
  /* eslint-env node */
  { LogOutput: process.stderr }
);
