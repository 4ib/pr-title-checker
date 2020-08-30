import * as core from "@actions/core";
import * as github from "@actions/github";
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const issue_number = process.env.GITHUB_REF.split("/")[2];
const regex = core.getInput("regex");
const label_name = core.getInput("label_name");
const label_color = core.getInput("label_color");
const { Octokit } = require("@octokit/action");

const octokit = new Octokit();

async function run() {
  try {
    const title = github.context.payload.pull_request.title;
    
    try {
      let createResponse = await octokit.issues.createLabel({
        owner,
        repo,
        name: label_name,
        color: label_color,
      });
      core.info(`Creating label (${label_name}) - ` + createResponse.status);
    } catch (error) {
      core.info(`Label (${label_name}) exists.`);
    }

    if (regex) {
      let re = new RegExp(regex);
      if (re.test(title)) {
        await removeLabel(label_name);
        return;
      }
    }

    await addLabel(label_name);
  } catch (error) {
    core.info(error);
  }
}

async function addLabel(name) {
  try {
    let addLabelResponse = await octokit.issues.addLabels({
      owner,
      repo,
      issue_number,
      labels: [name],
    });
    core.info(`Adding label (${name}) - ` + addLabelResponse.status);
  } catch (error) {
    core.info("All OK");
  }
}

async function removeLabel(name) {
  try {
    let removeLabelResponse = await octokit.issues.removeLabel({
      owner,
      repo,
      issue_number,
      name: name,
    });
    core.info(
      "No mismatches found. Deleting label - " + removeLabelResponse.status
    );
  } catch (error) {
    core.info("All OK");
  }
}

run();
