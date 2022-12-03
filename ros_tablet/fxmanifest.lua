fx_version 'cerulean'
game 'gta5'

description 'ros_tablet'
version '1.0.0'

shared_scripts {
    '@qb-core/shared/locale.lua'
}

client_scripts {
    'client.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server.lua'
}

ui_page 'nui/index.html'

files {
    'nui/*'
}

lua54 'yes'
