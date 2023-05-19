/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

export const APP_INIT = 'chatmate_init'
export const APP_LATEST_VERSION = 'chatmate_latest_version'
export const APP_INIT_ERROR = 'chatmate_init_error'
export const APP_SETTING_LOCALES = 'chatmate_locales'
export const APP_SETTING_THEME = 'chatmate_theme'
export const APP_SETTING_THEME_LIGHT_MODE =
  'chatmate_theme_light_mode'
export const APP_SETTING_THEME_DARK_MODE = 'chatmate_theme_dark_mode'
export const APP_SETTING_PASTE_FROM_CLIPBOARD =
  'chatmate_paste_from_clipboard'
export const APP_SETTING_API_KEY = 'chatmate_api_key'
export const APP_SETTING_API_SERVER = 'chatmate_api_server'
export const APP_SETTING_NETWORK_TIMEOUT = 'chatmate_network_timeout'
export const APP_SETTING_API_IDENTIFIER = 'chatmate_api_identifier'
export const APP_SETTING_CHAT_MODEL = 'chatmate_chat_model'
export const APP_SETTING_OPENAI_TEMPERATURE = 'openai_temperature'
export const APP_SETTING_MAX_MESSAGES_IN_CONTEXT =
  'chatmate_max_messages_in_context'
export const APP_SETTING_MAX_TOKENS_IN_CONTEXT =
  'chatmate_max_tokens_in_context'
export const APP_SETTING_MAX_TOKENS_PER_REPLY =
  'chatmate_max_tokens_per_reply'
export const APP_SETTING_SHOW_MODEL_NAME = 'chatmate_show_model_name'
export const APP_SETTING_SHOW_WORD_COUNT = 'chatmate_show_word_count'
export const APP_SETTING_SHOW_ESTIMATED_TOKEN_COUNT =
  'chatmate_show_estimated_token_count'
export const APP_SETTING_RENDER_MD = 'chatmate_render_md'
export const APP_SETTING_OPEN_LINK_IN_APP =
  'chatmate_open_link_in_app'
export const APP_SETTING_ICLOUD_SYNC = 'chatmate_icloud_sync'
export const APP_SETTING_ICLOUD_TIME = 'chatmate_icloud_time'
export const APP_SETTING_HAPTIC_FEEDBACK = 'chatmate_haptic_feedback'
export const APP_CHAT_REQUESTING = 'chatmate_chat_requesting'
export const APP_CHAT_MESSAGE_STREAMING = 'chatmate_message_streaming'
export const APP_CHAT_SETTING_STREAM_MESSAGE =
  'chatmate_stream_message'
export const APP_CHAT_STATUS = 'chatmate_chat_status'
export const APP_CHAT_ERROR = 'chatmate_chat_error'
export const APP_CHAT_USER_MESSAGE = 'chatmate_user_message'
export const APP_CONVERSATIONS_LOADING =
  'chatmate_conversations_loading'
export const APP_CONVERSATIONS_LOADED =
  'chatmate_conversations_loaded'
export const APP_CONVERSATIONS_CLEAR = 'chatmate_conversations_clear'
export const APP_SET_CURRENT_CONVERSATION =
  'chatmate_set_current_conversation'
export const APP_API_SERVERS_UPDATE = 'chatmate_api_servers_update'
export const APP_API_SERVERS_REMOVE = 'chatmate_api_servers_remove'
export const APP_CHAT_SETTING_AVATAR_LINK = 'chatmate_avatar_link'
export const APP_CHAT_ALWAYS_NEW_CHAT = 'chatmate_always_new_chat'
export const APP_CHAT_SETTING_USER_NAME = 'chatmate_user_name'
export const APP_CHAT_SETTING_MESSAGE_BUBBLE_BEHAVIOR =
  'chatmate_message_bubble_behavior'
export const APP_CHAT_SETTING_FONT_SIZE_RATIO =
  'chatmate_font_size_ratio'
export const APP_CHAT_SETTING_SHOW_USER_AVATAR =
  'chatmate_show_user_avatar'
export const APP_CHAT_SETTING_SHOW_USER_NAME =
  'chatmate_show_user_name'
export const APP_CHAT_SETTING_IS_LOADING_EARLIER =
  'chatmate_is_loading_earlier'
export const APP_CHAT_SETTING_ALWAYS_SHOW_SEND_BUTTON =
  'chatmate_always_show_send_button'
export const APP_CHAT_SETTING_ALWAYS_SHOW_PROMPT =
  'chatmate_always_show_prompt'
export const APP_CHAT_SETTING_CONVERSATIONS_ORDER_BY =
  'chatmate_conversations_order_by'
export const APP_CACHE_UPDATE_CONVERSATIONS =
  'chatmate_cache_update_conversations'
export const APP_CACHE_REMOVE_CONVERSATIONS =
  'chatmate_cache_remove_conversation'
export const APP_CACHE_RECENT_REMOVED_CHAT_IDS =
  'chatmate_cache_recent_removed_chat_ids'
export const APP_CACHE_CLEAR_CONVERSATIONS =
  'chatmate_cache_clear_conversations'
export const APP_SHORTCUT_FILTER_SETTING =
  'chatmate_shortcut_filter_setting'
export const APP_CACHE_SHORTCUTS = 'chatmate_cache_shortcuts'
export const APP_CACHE_FEATURE_TIP_HISTORY =
  'chatmate_cache_feature_tip_history'
export const ActionTypes = {
  APP_CACHE_SHORTCUTS,
  APP_SHORTCUT_FILTER_SETTING,
  APP_CACHE_CLEAR_CONVERSATIONS,
  APP_CACHE_REMOVE_CONVERSATIONS,
  APP_CACHE_UPDATE_CONVERSATIONS,
  APP_CHAT_SETTING_AVATAR_LINK,
  APP_API_SERVERS_UPDATE,
  APP_API_SERVERS_REMOVE,
  APP_CACHE_RECENT_REMOVED_CHAT_IDS,
  APP_CHAT_SETTING_SHOW_USER_AVATAR,
  APP_CHAT_ALWAYS_NEW_CHAT,
  APP_CHAT_SETTING_ALWAYS_SHOW_SEND_BUTTON,
  APP_SETTING_ICLOUD_TIME,
  APP_SETTING_OPEN_LINK_IN_APP,
  APP_CHAT_SETTING_ALWAYS_SHOW_PROMPT,
  APP_CHAT_SETTING_STREAM_MESSAGE,
  APP_CHAT_SETTING_CONVERSATIONS_ORDER_BY,
  APP_CHAT_SETTING_SHOW_USER_NAME,
  APP_CHAT_SETTING_FONT_SIZE_RATIO,
  APP_CHAT_SETTING_IS_LOADING_EARLIER,
  APP_CHAT_SETTING_USER_NAME,
  APP_INIT,
  APP_LATEST_VERSION,
  APP_SETTING_PASTE_FROM_CLIPBOARD,
  APP_CHAT_SETTING_MESSAGE_BUBBLE_BEHAVIOR,
  APP_CHAT_STATUS,
  APP_INIT_ERROR,
  APP_CHAT_USER_MESSAGE,
  APP_CHAT_MESSAGE_STREAMING,
  APP_CHAT_REQUESTING,
  APP_SETTING_LOCALES,
  APP_SETTING_THEME,
  APP_SETTING_ICLOUD_SYNC,
  APP_SETTING_THEME_LIGHT_MODE,
  APP_SETTING_THEME_DARK_MODE,
  APP_SETTING_HAPTIC_FEEDBACK,
  APP_SETTING_RENDER_MD,
  APP_SETTING_API_KEY,
  APP_SETTING_API_SERVER,
  APP_SETTING_CHAT_MODEL,
  APP_CACHE_FEATURE_TIP_HISTORY,
  APP_SETTING_MAX_MESSAGES_IN_CONTEXT,
  APP_SETTING_MAX_TOKENS_IN_CONTEXT,
  APP_SETTING_NETWORK_TIMEOUT,
  APP_SETTING_API_IDENTIFIER,
  APP_SETTING_OPENAI_TEMPERATURE,
  APP_SETTING_MAX_TOKENS_PER_REPLY,
  APP_SETTING_SHOW_MODEL_NAME,
  APP_SETTING_SHOW_WORD_COUNT,
  APP_SETTING_SHOW_ESTIMATED_TOKEN_COUNT,
  APP_SET_CURRENT_CONVERSATION,
  APP_CHAT_ERROR,
  APP_CONVERSATIONS_LOADING,
  APP_CONVERSATIONS_LOADED,
  APP_CONVERSATIONS_CLEAR
}
// see https://stackoverflow.com/questions/52393730/typescript-string-literal-union-type-from-enum
export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes]
/**
 * @description Action Entity
 */
export interface Action {
  type: ActionTypes
  payload: any
}
