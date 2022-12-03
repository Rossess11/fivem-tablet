QBCore = nil
local QBCore = exports['qb-core']:GetCoreObject()

QBCore.Functions.CreateCallback('ros_tablet:server:getInfo', function(source,cb)
    local src = source
    local pData = QBCore.Functions.GetPlayer(src)
    local result = MySQL.query.await('SELECT * FROM players WHERE citizenid = ?', {pData.PlayerData.citizenid})
    if result[1] ~= nil then
            cb(result)
        cb(result)
    else 
        cb(nil)
    end
end)

QBCore.Functions.CreateCallback('ros_tablet:server:getVehicles', function(source,cb)
    local src = source
    local pData = QBCore.Functions.GetPlayer(src)
    local result = MySQL.query.await('SELECT * FROM player_vehicles WHERE citizenid = ?', {pData.PlayerData.citizenid})
    if result[1] ~= nil then
        cb(result)
    else 
        cb(nil)
    end
end)

QBCore.Functions.CreateCallback('ros_tablet:server:getCards', function(source,cb)
    local src = source
    local pData = QBCore.Functions.GetPlayer(src)
    local result = MySQL.query.await('SELECT * FROM bank_cards WHERE citizenid = ?', {pData.PlayerData.citizenid})
    if result[1] ~= nil then
        cb(result)
    else 
        cb(nil)
    end
end)

QBCore.Functions.CreateCallback('ros_tablet:server:getPropiedades', function(source,cb)
    local src = source
    local pData = QBCore.Functions.GetPlayer(src)
    local result = MySQL.query.await('SELECT * FROM player_houses WHERE citizenid = ?', {pData.PlayerData.citizenid})
    if result[1] ~= nil then
        cb(result)
    else 
        cb(nil)
    end
end)

QBCore.Functions.CreateCallback('ros_tablet:server:getInvoices', function(source,cb)
    local src = source
    local pData = QBCore.Functions.GetPlayer(src)
    local bankamount = pData.PlayerData.money.bank
    local result = MySQL.query.await('SELECT * FROM ros_invoices WHERE citizenid = ?', {pData.PlayerData.citizenid})
    if result[1] ~= nil then
        cb(result)
    else 
        cb(nil)
    end
end)

RegisterNetEvent('ros_tablet:PayInvoice', function(valor, cantidad, society)
    local a = valor;
    local b = cantidad;
    --local c = society;
    local Ply = QBCore.Functions.GetPlayer(source)
    local SenderPly = QBCore.Functions.GetPlayerByCitizenId(sendercitizenid)
    Ply.Functions.RemoveMoney('bank', cantidad, "paid-invoice")
	--exports['qb-management']:AddMoney(society, amount)
    MySQL.query('DELETE FROM ros_invoices WHERE id = ?', {a})
end)

RegisterNetEvent('ros_tablet:fotoasql', function(foto)
    local a = foto
    local src = source
    local pData = QBCore.Functions.GetPlayer(src)
    MySQL.update('UPDATE players SET profilesImages = ? WHERE citizenid = ?',{foto,pData.PlayerData.citizenid})
end)


QBCore.Commands.Add('rosbill', 'Bill A Player', {{name = 'id', help = 'Player ID'}, {name = 'amount', help = 'Fine Amount'}}, false, function(source, args)
    local biller = QBCore.Functions.GetPlayer(source)
    local billed = QBCore.Functions.GetPlayer(tonumber(args[1]))
    local amount = tonumber(args[2])
    --if biller.PlayerData.job.name == "police" or biller.PlayerData.job.name == 'ambulance' or biller.PlayerData.job.name == 'mechanic' then
        if billed ~= nil then
            --if biller.PlayerData.citizenid ~= billed.PlayerData.citizenid then
                if amount and amount > 0 then
                    MySQL.insert(
                        'INSERT INTO ros_invoices (citizenid, amount, society, sender, sendercitizenid) VALUES (?, ?, ?, ?, ?)',
                        {billed.PlayerData.citizenid, amount, biller.PlayerData.job.name,
                         biller.PlayerData.charinfo.firstname, biller.PlayerData.citizenid})
                    TriggerClientEvent('QBCore:Notify', source, 'Invoice Successfully Sent', 'success')
                    TriggerClientEvent('QBCore:Notify', billed.PlayerData.source, 'New Invoice Received')
                else
                    TriggerClientEvent('QBCore:Notify', source, 'Must Be A Valid Amount Above 0', 'error')
                end
            --else
                --TriggerClientEvent('QBCore:Notify', source, 'You Cannot Bill Yourself', 'error')
            --end
        else
            TriggerClientEvent('QBCore:Notify', source, 'Player Not Online', 'error')
        end
    --else
        TriggerClientEvent('QBCore:Notify', source, 'No Access', 'error')
    --end
end)
