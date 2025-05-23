/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/



import mongoose from "mongoose";
import { ORGANIZATION_NAME } from "../utils/env.js";


let Membershipschema = new mongoose.Schema({
    id: {
        type: Number,
        default: Date.now,
        unique:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    member_image:String,
    fname:String,
    lname:String,
    email:String,
    phone:Number,
    date_of_birth:String,
    country:String,
    city:String,
    district:String,
    postcode:String,
    doju_Name:String,
    instructor:String,
    current_grade:String,
    violance_charge:String,
    permanent_disabillity:String,
    previous_membership_expiring_date:String,
    membership_exp_date:Date,
    previous_injury:String,
    gender:String,
    is_previous_member:String,
    experience_level:String,
    has_violance_charge:String,
    has_permanent_injury:String,
    membership_name:String,
    membership_company: {
        type :String,
        trim:true,
        default :ORGANIZATION_NAME
    },
    membership_company_short:{
        type :String,
        trim:true,
        default :"STMA"
    },
    membership_type :String,
    accepted_roles: { role1: { type: Boolean, default: true }, role2: { type: Boolean, default: true }, },
  
    isPaymentCompleted:{
        type :Boolean,
        default :false,
        required :true
    },
    payment_method:String,
    paypal_token :String,
    stripe_id :String
})



export const Memberships = mongoose.model('Membership',Membershipschema);
