const DEFAULT_CHANNEL_NAME = "d4-event-alerts"
const DEFAULT_CHANNEL_TOPIC = "Use the /d4-alerts command to manage role notifications"
const DEFAULT_ROLE_COLOR = "#700002"
const ROLE_NAME_HELLTIDE = "D4 Alerts Helltide"
const ROLE_NAME_LEGION = "D4 Alerts Legion"
const ROLE_NAME_WORLD_BOSS = "D4 Alerts World Boss"

const AVAILABLE_ROLES = [
  ROLE_NAME_HELLTIDE,
  ROLE_NAME_LEGION,
  ROLE_NAME_WORLD_BOSS,
]

module.exports = {
  AVAILABLE_ROLES,
  DEFAULT_CHANNEL_NAME,
  DEFAULT_CHANNEL_TOPIC,
  DEFAULT_ROLE_COLOR,
  ROLE_NAME_HELLTIDE,
  ROLE_NAME_LEGION,
  ROLE_NAME_WORLD_BOSS,
}
