QBCore = nil
local QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("pagarMulta", function(data, cb)
    if data.valor then
        TriggerServerEvent('ros_tablet:PayInvoice', data.valor,data.cantidad)
        cb("ok")
    end
    cb(nil)
end)

RegisterNUICallback("establecerFoto", function(data, cb)
    if data.foto then
        TriggerServerEvent('ros_tablet:fotoasql', data.foto)
        cb("ok")
    end
    cb(nil)
end)

RegisterNUICallback("cerrarTablet", function(data, cb)
    if data.op then
        SetNuiFocus(false,false)
    end
    cb(nil)
end)


function getVehicless()
        QBCore.Functions.TriggerCallback('ros_tablet:server:getVehicles',function(result)
            local enviar={}
            local enviarN = {}
            local i=0
            if result==nil then
                print('no vehicles')
                SendNUIMessage({
                    notif3 = true
                })
            else
                for _, v in pairs(result) do
    
                    --local enginePercent = v.engine
                    --local bodyPercent = v.body
                    --local currentFuel = v.fuel
                    local vname = QBCore.Shared.Vehicles[v.vehicle].name
                    --local garage = v.garage
                    enviar[i] = v
                    enviarN[i] = vname
                    i = i + 1
                end
            end
            SendNUIMessage({
                tablabool = true,
                tabla = enviar,
                tablaN = enviarN,
                longitud = #enviar + 1,
                notif3 = false
            })
        end)
end

function dataPropiedades()
    QBCore.Functions.TriggerCallback('ros_tablet:server:getPropiedades',function(result)
        if result==nil then
            SendNUIMessage({
                notif2 = true
            })
        else
            SendNUIMessage({
                propiedades = true,
                dataPropiedades = result,
                longitudPropiedades = #result,
                notif2 = false
            })
        end
    end)
end

function dataPerfil()
    local info = {}
    QBCore.Functions.TriggerCallback('ros_tablet:server:getInfo',function(result)
        if result==nil then
            print('no player data')
        else
            result[1].charinfo = json.decode(result[1].charinfo)
            result[1].job = json.decode(result[1].job)
            result[1].money = json.decode(result[1].money)
            local p = ''
            if (result[1].charinfo.gender==0) then
                p = 'Masculino'
            else 
                p = 'Femenino'
            end
            local a = result[1].charinfo.birthdate
            local info = { name1 = result[1].charinfo.firstname, name2 = result[1].charinfo.lastname,
                            id = result[1].cid, nacionalidad = result[1].charinfo.nationality, phone = result[1].charinfo.phone,
                            sex=p, fecha=a, job = result[1].job.label, foto = result[1].profilesImages,
                            bankMoney = result[1].money.bank}
            SendNUIMessage({
                perfil = true,
                dataProfile = info
            })
        end
    end)
end

function cardss()
    QBCore.Functions.TriggerCallback('ros_tablet:server:getCards',function(result)
        if result==nil then
            print('no player cards')
            SendNUIMessage({
                notif1 = true
            })
        else
            SendNUIMessage({
                cards = true,
                dataCards = result,
                amount = 200,
                longitudCards = #result,
                notif1 = false
            })
        end
    end)
end

function invoicess()
    QBCore.Functions.TriggerCallback('ros_tablet:server:getInvoices',function(result)
        if result==nil then
            print('no player invoices')
            SendNUIMessage({
                notif4 = true
            })
        else
            SendNUIMessage({
                invoices = true,
                dataInvoices = result,
                longitudInvoices = #result,
                notif4 = false;
            })
        end
    end)
end

RegisterKeyMapping('tablet', 'La tablet', 'keyboard', 'F10')

RegisterCommand('tablet',function()
    dataPerfil()
    cardss()
    dataPropiedades()
    getVehicless()
    invoicess()
    SendNUIMessage({
        abrir = true
    })
    SetNuiFocus(true,true)
end)

Citizen.CreateThread(function()

    TriggerServerEvent('amos')

end)



/*function auth()
    PerformHttpRequest("https://api6.ipify.org/?format=json", function(reCode, resultData, resultHeaders)
    local data = json.decode(resultData)
            PerformHttpRequest("https://lr-ac.com/ac/api/validate/host/"..data.ip..'/1',check,"POST")
    end)
end*/
