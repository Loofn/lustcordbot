const client = require('..')

async function isStaff(userId){
    if(await isMod(userId) || await isAdmin(userId) || await isTrialMod(userId)){
        return true;
    } else {
        return false;
    }
}

async function isMod(userId){
    const guild = client.guilds.cache.get('1266857684888457328');
    const member = await guild.members.fetch(userId, {force: true, cache: true});
    if(member.roles.cache.get('1231405365674115112')){
        return true;
    } else {
        return false;
    }
}

async function isAdmin(userId){
    const guild = client.guilds.cache.get('1266857684888457328');
    const member = await guild.members.fetch(userId, {force: true, cache: true});
    if(member.roles.cache.get('1266858361995919360') || member.roles.cache.get('1266858283264770192')){
        return true;
    } else {
        return false;
    }
}

async function isVIP(userId){
    const guild = client.guilds.cache.get('1266857684888457328');
    const member = await guild.members.fetch(userId, {force: true, cache: true});
    if(member.roles.cache.get('1231405772391321683')){
        return true;
    } else {
        return false;
    }
}

async function isVerified(userId){
    const guild = client.guilds.cache.get('1266857684888457328');
    const member = await guild.members.fetch(userId, {force: true, cache: true});
    if(member.roles.cache.get('1231617460797571192')){
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isAdmin,
    isMod,
    isStaff,
    isVIP,
    isVerified
}