/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  if (await User.count() > 0) {
        return;
        }
        
        await User.createEach([
        { emailAddress: 'aida@hotmail.de', fullName: 'Aida', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('123abc') },
        
        { emailAddress: 'elida@hotmail.de', fullName: 'Elida', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('123abc') }
      ])
      };


