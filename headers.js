import dotenv from 'dotenv'

dotenv.config();

export default async function checkMoobotHeaders(ctx, next) {
  let moobot_channel_id = ctx.request.get('Moobot-channel-id');
  let moobot_channel_name = ctx.request.get('Moobot-channel-name');
  let channel_id = process.env.TWITCH_CHANNEL_ID;
  let channel_name = process.env.TWITCH_CHANNEL_NAME;

  if (channel_id == moobot_channel_id && channel_name == moobot_channel_name) {
    next();
  }
  else {
    ctx.status = 403;
  }
}