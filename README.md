# alien_project
Typescript | Node.Js | Koa.Js | TypeORM | PostgreSQL | PGAdmin | Docker


## Context:

We are at war with an alien race with sophisticated text encryption technology. We were able to intercept some of their messages and we manage to understand some rules about their language. 

In order to win the fight, we need a backend to store, read and process the intercepted messages from the aliens. Sadly, at some point during the fight, all our developers were kidnaped and you are the only one who can finish the task they started.

This is what we know about their language:

### Alien grammar rules:

1. Each message is a set of words. Example: "Rortf Rtiasek Rnagne".
2. The first letter of each word must be the same among one message and represents the letter assigned to the Alien leader sending that message.
    1. Message "Rortf Rtiasek Rnagne" → This message was sent by Alien Leader R.
    2. Message "Hugehw Rnagne" → Is a fake message only to distract.
3. A valid word only has 3 consonants (This does not include the first letter). Otherwise is fake and the whole message is fake.
    1. "Rtiasek" → *R* tiasek  → is valid word.
    2. "Oheasee" → *O* heasee → Only 2 consonants. Invalid word.
4. Words can be either INFO, DANGER or WARNING. 
    1. A word is DANGER if the order of the consonants is ASCENDING. (This does not include the first letter)
        1. "Hugehw" → g, h, w → Ascending → DANGER.
    2. A word is INFO if the order of the consonants is nor ascending nor descending. (This does not include the first letter)
        1. "Monixob" → n, x, b → Nor ascending nor descending → INFO
    3. A word is WARNING if the order of the consonants is DESCENDING. (This does not include the first letter)
        1. "Mozyx" → z, y, x → Descending → WARNING.
5. A message is only valid if all of its words belong to the same category (INFO, DANGER or WARNING). 

## Goal:

We need to be able to do the following tasks:

- Store an incoming message.
- Fetch the messages that arrived between two given dates.
- Fetch the messages from a given Alien leader.
- Fetch the messages from a given Type (INFO, DANGER, WARNING).
- Fetch by invalid/valid messages (If invalid, state why is it invalid).
- Replace a message. You will receive the original message and a new string which is the new message to store instead of the original. You can only allow this if the original message is < 5 minutes old.

### Challenge:

- Notify to slack if the same Alien Leader has sent 5 DANGER messages in a time span of 1 hour.

## Run Project:
- To run the database project: 'docker compose up'
- To run the functions project: 'npm run watch-server'
- There is a command `npm run loadFixtures` to run the script in the folder fixtures/loadFixtures.js.  In that script, you will find some examples to populate the db with data. 
