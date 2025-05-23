/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/
import { createStripeCheckOut } from "../Config/stripe.js";
import { membershipCongratulationsEmail, sendMembershipMails } from "../mail/membership.mail.js";
import { Memberships } from "../models/Membership.js";
import MembershipCoupons from "../models/membershipcoupon.js";
import { Orders } from "../models/Order.js";
import { Settings } from "../models/settings.js";
import { User } from "../models/user.js";
import { STRIPE_CURRENCY } from "../utils/env.js";
import { repleCaracter } from "../utils/replaceCr.js";
import { Alert, isValidUrl, log, Success } from "../utils/smallUtils.js";
import { MakePriceString, makeTimeString } from "../utils/string.manipolation.js";
import { membershipSuccessPage } from "./MembershipApi.js";




export async function membershipMidleWareStripe(req, res, next) {
    let memberships = [
        {
            
            price_data: {
                currency: STRIPE_CURRENCY,
                product_data: {
                    name: 'Goju shin Ryu Annual Membership'
                },
                unit_amount: 75 * 100
            },
            quantity: 1
        },
        {

            price_data: {
                currency: STRIPE_CURRENCY,
                product_data: {
                    name: 'Goju shin Ryu LifeTime Membership'
                },
                unit_amount: 250 * 100
            },
            quantity: 1

            // name :'Goju shin Ryu LifeTime Membership',
            // description :'Goju shin Ryu LifeTime Membership',
            // quantity :1,
            // price :150,
            // unit_amount:{
            //     currency_code:STRIPE_CURRENCY,
            //     value :'150.00'
            // }
        },
        {
            price_data: {
                currency: STRIPE_CURRENCY,
                product_data: {
                    name: 'School of Traditional Martial Art Annual Membership'
                },
                unit_amount: 75 * 100
            },
            quantity: 1
            // name :'School of Traditional Martial Art Annual Membership',
            // description :'School of Traditional Martial Art Membership',
            // quantity :1,
            // price :75,
            // unit_amount:{
            //     currency_code:STRIPE_CURRENCY,
            //     value  :'75.00'
            // }
        },
        {
            price_data: {
                currency: STRIPE_CURRENCY,
                product_data: {
                    name: 'School of Traditional Martial Art LifeTime Membership'
                },
                unit_amount: 250 * 100
            },
            quantity: 1
            // name :'School of Traditional Martial Art LifeTime Membership',
            // description :'School of Traditional Martial Art LifeTime Membership',
            // quantity :1,
            // price :150,
            // unit_amount:{
            //     currency_code:STRIPE_CURRENCY,
            //     value :'150.00'
            // }
        }
    ];
    let {
        fname,
        lname,
        email,
        phone,
        date_of_birth,
        country,
        city,
        district,
        postcode,
        doju_Name,
        instructor,
        current_grade,
        violance_charge,
        permanent_disabillity,
        membership_expiring_date,
        previous_injury,
        gender,
        is_previous_member,
        experience_level,
        has_violance_charge,
        has_permanent_injury,
        membeship_array,
    } = req.body;
    try {

        let testArray = [
            fname,
            lname,
            email,
            phone,
            date_of_birth,
            country,
            city,
            district,
            postcode,
            gender,
            doju_Name,
            instructor,
            current_grade,
            membeship_array.length,
            previous_injury,
            is_previous_member,
            experience_level,
            has_violance_charge,

        ];
        let notFoundIndex = testArray.findIndex(el => !el);
        if (notFoundIndex !== -1) throw new Error("Please Complete the form");
        let userInfo = {};

        let stripe_items = [];
        if (gender !== 'Male' && gender !== 'Female') throw 'Gender is not correct'
        if (has_violance_charge !== 'Yes' && has_violance_charge !== 'No') throw 'Violance charge is not correct'
        if (has_permanent_injury !== 'Yes' && has_permanent_injury !== 'No') throw 'Violance charge is not correct'
        if (is_previous_member !== 'Yes' && is_previous_member !== 'No') throw 'Violance charge is not correct'
        if (experience_level !== 'Senior' && experience_level !== 'Junior') throw 'experience_level is not correct'

        if (typeof phone !== 'number') throw new Error("phone not correct");
        if (Number(phone).toString().toLowerCase() === 'nan') throw new Error("phone not correct");

        if (!isValidUrl(req.body.memberImage)) return res.status(400).json({ error: "Member image is emty" });
        req.body.memberImage = await urlToCloudinaryUrl(req.body.memberImage);
        
        //array check
        for (let i = 0; i < membeship_array.length; i++) {
            let { company, membership } = membeship_array[0];
            if (!membership || !company) throw 'Server error ,line 77'
            if (typeof company !== 'string' || typeof membership !== 'string') throw 'Server error ,line 78'
            if (company !== 'gojushinryu' && company !== 'school_of_traditional_martial_art') throw 'Server error ,line 79'
            if (membership !== 'Annual' && membership !== 'LifeTime') throw 'Server error ,line 80'
            company = company === 'gojushinryu' ? 'Goju shin Ryu' : 'School of Traditional Martial Art';
            let membership_object = memberships.find(el => (el.price_data.product_data.name.includes(company) && el.price_data.product_data.name.includes(membership)));


            if (typeof membership_object !== 'object' || !membership_object) throw new Error("membership_object problem");

            stripe_items.push(membership_object);
            membeship_array.push({
                membership_company: company,
                membership_type: membership,
                membership_name: membership_object.name
            });
            membership = membeship_array.shift();

        }
        {
            //string
            userInfo.member_image=req.body.memberImage;
            userInfo.fname = await repleCaracter(fname);
            userInfo.lname = await repleCaracter(lname);
            userInfo.email = await repleCaracter(email);
            userInfo.date_of_birth = await repleCaracter(date_of_birth);
            userInfo.country = await repleCaracter(country);
            userInfo.city = await repleCaracter(city);
            userInfo.district = await repleCaracter(district);
            userInfo.doju_Name = await repleCaracter(doju_Name);
            userInfo.instructor = await repleCaracter(instructor);
            userInfo.current_grade = await repleCaracter(current_grade);
            userInfo.previous_injury = await repleCaracter(previous_injury);
            userInfo.postcode = await repleCaracter(postcode);

            //number
            userInfo.phone = phone;

            //conditional
            if (has_permanent_injury === 'Yes') userInfo.permanent_disabillity = await repleCaracter(permanent_disabillity)
            if (has_violance_charge === 'Yes') userInfo.violance_charge = await repleCaracter(violance_charge);
            if (is_previous_member === 'Yes') userInfo.membership_expiring_date = await repleCaracter(membership_expiring_date);

            //object
            userInfo = { ...userInfo, gender, is_previous_member, experience_level, has_violance_charge, has_permanent_injury, membeship_array }
        }

        //request

        req.purified_user_info = userInfo;
        req.stripe_items = stripe_items;

        return next();
    } catch (error) {
        log({ error });
        Alert(error, res)
    }
}

export async function stripeMembershipFunction(req, res) {
    try {
        let stripe_items = req.stripe_items;
        let purified_user_info = req.purified_user_info;
        let { membeship_array } = purified_user_info;
        let membershipDataBaseArray = [];

        for (let i = 0; i < membeship_array.length; i++) {
            let { membership_name, membership_type, membership_company } = membeship_array[i];
            let {
                member_image,
                fname,
                lname,
                email,
                phone,
                date_of_birth,
                country,
                city,
                district,
                postcode,
                doju_Name,
                instructor,
                current_grade,
                previous_injury,
                gender,
                is_previous_member,
                experience_level,
                has_violance_charge,
                has_permanent_injury,
            } = purified_user_info;



            let membership = new Memberships({
                member_image,
                fname,
                lname,
                email,
                phone,
                date_of_birth,
                country,
                city,
                district,
                postcode,
                doju_Name,
                instructor,
                current_grade,
                previous_injury,
                gender,
                is_previous_member,
                experience_level,
                has_violance_charge,
                has_permanent_injury,
                membership_name,
                membership_type,
                membership_company,
                membership_exp_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 60 * 1000)
            });


            if (has_permanent_injury === 'Yes') membership.permanent_disabillity = purified_user_info.permanent_disabillity;
            if (has_violance_charge === 'Yes') membership.violance_charge = purified_user_info.violance_charge;
            if (is_previous_member === 'Yes') membership.previous_membership_expiring_date = purified_user_info.membership_expiring_date;

            let { membershipData, error } = await membership.save().then((e) => ({ _id: e._id, id: e.id, membershipData: e }));

            if (error) throw 'Can not create membership'
            if (membershipData) membershipDataBaseArray.push(membershipData)

        }


        //coupon
        if (typeof req.body.coupon === 'string') {
            let mCoupon = await MembershipCoupons.findOne().where('code').equals(req.body.coupon.trim().toUpperCase());
            if (mCoupon?.rate) {
                for (let i = 0; i < stripe_items.length; i++) {
                    stripe_items[i].price_data.unit_amount -= stripe_items[i].price_data.unit_amount * mCoupon.rate;
                }
            }
        }


        { //gst rate 
            let gst_rate = (await Settings.findOne({})).gst_rate / 100 || 0.05;
            for (let i = 0; i < stripe_items.length; i++) {
                stripe_items[i].price_data.unit_amount += stripe_items[i].price_data.unit_amount * gst_rate;
                stripe_items[i].price_data.unit_amount = Math.floor(stripe_items[i].price_data.unit_amount);
            }
        }

        let data = await createStripeCheckOut({
            line_items: stripe_items,
            success_url: '/api/api_s/stripe-membership-success',
            cancel_url: '/api/api_s/stripe-membership-cancel',
            amount_shipping: 0
        });

        if (!data) return res.json({ error: 'failed to payment' })

        for (let i = 0; i < membershipDataBaseArray.length; i++) {
            let { _id } = membershipDataBaseArray[i];
            let membership = await Memberships.findById(_id)
            membership.stripe_id = data.id;
            await membership.save();
        }

        return res.json({ success: true, link: data.url })
    } catch (error) {
        console.error(error);
        return Alert(error, res)
    }
}


export async function stripeMembershipSuccessFunction(req, res) {
    try {
        let { session_id } = req.query;
        if (!session_id) return res.render('notAllowed')
        function status(data) {
            if (!data) return false
            if (data.includes('{')) return false
            if (data.includes('}')) return false
            if (data.includes('*')) return false
            if (data.includes(':')) return false
            if (data.includes('[')) return false
            if (data.includes(']')) return false
            if (data.includes('(')) return false
            if (data.includes('(')) return false
            if (data.includes('$')) return false
            if (data.includes('>')) return false
            if (data.includes('<')) return false
            return true
        }
        status = status(session_id);
        log({ status })
        if (!status) return res.redirect('notAllowed');
        let memberships = await Memberships.find({
            stripe_id: session_id
        });
        sendMembershipMails(memberships[0]);
        for (let i = 0; i < memberships.length; i++) {
            memberships[i].isPaymentCompleted = true;
            await memberships[i].save();
            await membershipCongratulationsEmail(memberships[i].email.trim(), memberships[i].lname, ORGANIZATION_NAME, memberships[i].membership_type);
        }
        res.send(membershipSuccessPage({ student_name: memberships[0].lname, ids: memberships.map(el => el.id), types: memberships.map(el => el.membership_type) }))
        return;
    } catch (error) {

        log({ error })

    }
}


export async function stripeMembershipCancelFunction(req, res) {
    try {

        let { session_id } = req.query
        function status(data) {
            if (!data) return false
            if (data.includes('{')) return false
            if (data.includes('}')) return false
            if (data.includes('*')) return false
            if (data.includes(':')) return false
            if (data.includes('[')) return false
            if (data.includes(']')) return false
            if (data.includes('(')) return false
            if (data.includes('(')) return false
            if (data.includes('$')) return false
            if (data.includes('>')) return false
            if (data.includes('<')) return false
            return true
        }
        status = status(session_id);
        if (!status) return res.render('notAllowed');
        let memberships = await Memberships.find({}, '_id').where('stripe_id').equals(session_id);
        for (let i = 0; i < memberships.length; i++) (await Memberships.findByIdAndDelete(memberships[i]._id))
        return res.redirect('/')
    } catch (error) {
        console.log({ error });
        return res.redirect('/')
    }
}
