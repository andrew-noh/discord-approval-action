import { getInput, setOutput, setFailed } from '@actions/core';
import DiscordApproval from './discord';

async function run() {
  try {
    const token = getInput('discord-bot-token', { required: true });
    const channelId = getInput('channel-id', { required: true });
    const title = getInput('title', { required: true });
    const description = getInput('description', { required: false }) || '';
    const timeout = parseInt(getInput('timeout')) || 300;

    const approval = new DiscordApproval(token, channelId);
    await approval.initialize();

    const approved = await approval.requestApproval(title, description, timeout);
    setOutput('approved', approved.toString());

    if (!approved) {
      setFailed('Deployment was not approved');
    }
  } catch (error) {
    setFailed(error.message);
  }
}

run();