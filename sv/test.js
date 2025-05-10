/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
Insha Allah,  By his marcy I will Gain Success 
*/



import { connect } from "mongoose";
import { SDATABASE } from "./_lib/utils/env.js";
import { AllienceGrandMaster } from "./_lib/models/AllienceGrandMaster.js";

await connect(SDATABASE)


let array = await AllienceGrandMaster.find({})
for (let u = 0; u < array.length; u++) {
    const element = array[u];
    element.country = 'USA';
    await element.save();
}

process.exit()
