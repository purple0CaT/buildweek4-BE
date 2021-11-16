import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import UserModel from '../user/schema.js'
// import {generateJwt} from SOMEWHERE <--------------------- GENERATE JWN NEEDED !!!!!!

const googleStrategy=new GoogleStrategy({
        clientID:process.env.GOOGLE_OAUTH_ID,
        clientSecret:process.env.GOOGLE_OAUTH_SECRET,
        callbackURL:process.env.GOOGLE_REDIRECT_URL
    },
    async(accessToken,refreshToken,profile,passportNext)=>{
            console.log('PROFILE from OAUTH: ',profile) //********************************CONSOLE LOG HERE */
        const user=await UserModel.findOne({googleId:profile.id})
            console.log('USER from OAUTH: ',user)   //********************************CONSOLE LOG HERE */
        if(user){
            const token=await generateJwt({id:user._id.toString()})
                console.log('USER ID from OAUTH (EXISTING USER): ',user._id)    //************************CONSOLE LOG HERE */
            passportNext(null,{token})
        }else{
            const user=new UserModel({
                username: profile.name.givenName, // USING GOOGLE's givenName AS username
                email:profile.emails[0].value,
                googleId:profile.id
            })
            await user.save()
                console.log('USER ID from OAUTH (CREATED USER): ',user._id) //********************************CONSOLE LOG HERE */
            const token=await generateJwt({id:user._id.toString()})
            passportNext(null,{token})
        }
    }
)
passport.serializeUser(function(userData,passportNext)
    {passportNext(null,userData)}
)

export default googleStrategy