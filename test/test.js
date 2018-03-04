var Assert = require('assert');
var Anderson = require('../src/anderson')


//-------- test for question -----------
describe('anderson', function() {
describe('#isQuestion', function() {
    it('should return true - quel jour sommes-nous', function() 
    {
        Assert.equal(Anderson.isQuestion("quel jour sommes-nous"),true);    
    });
    it('should return false - somme nous bete', function() 
    {
        Assert.equal(Anderson.isQuestion("somme nous bete"),false);
    });
    it('should return true - tu crois qu il va faire beau aujourd hui ?', function() 
    {
        Assert.equal(Anderson.isQuestion("tu crois qu'il va faire beau aujourd'hui ?"),true);    
    });
    it('should return false - j ai la reponse !', function() 
    {
        Assert.equal(Anderson.isQuestion("j'ai la reponse !"),false);    
    });
    it('should return false - anno 1404 est un super jeu', function() 
    {
        Assert.equal(Anderson.isQuestion("anno 1404 est un super jeu"),false);    
    });
})})


// ------ test for hour ---------
describe('anderson', function() {
describe('#isForHour', function() {
    it('should return true - quelle heure est t il?', function() 
    {
        Assert.equal(Anderson.isForHour("quel heure est t il?"),true);    
    });
    it('should return true - quelle heure est t-il?', function() 
    {
        Assert.equal(Anderson.isForHour("quel heure est t-il?"),true);    
    });
    it('should return true - bon, il est quelle heure', function() 
    {
        Assert.equal(Anderson.isForHour("bon, il est quel heure"),true);
    });
    it('should return false - A quelle heure as tu cours d anglais ?', function() 
    {
        Assert.equal(Anderson.isForHour("A quelle heure as tu cours d anglais ?"),false);    
    });
    it('should return false - il est gentil hein? !', function() 
    {
        Assert.equal(Anderson.isForHour("il est gentil hein?"),false);    
    });
    it('should return false - anno 1404 est un super jeu', function() 
    {
        Assert.equal(Anderson.isForHour("anno 1404 est un super jeu"),false);    
    });
})})


// ------ test for who ---------
describe('anderson', function() {
    describe('#whoIsIt', function() {
        it('should return Barack Obama - qui est Barack Obama?', function() 
        {
            Assert.equal(Anderson.whoIsIt("qui est Barack Obama?"),"Barack Obama");    
        });
        it('should return Steve Jobs - c qui steve jobs ?', function() 
        {
            Assert.equal(Anderson.whoIsIt("c qui steve jobs ?"),'Steve Jobs');    
        });
        it('should return null - c quoi du canard?', function() 
        {
            Assert.equal(Anderson.whoIsIt("c quoi du canard?"),null);    
        });
        it('should return null - il est gentil hein? !', function() 
        {
            Assert.equal(Anderson.whoIsIt("il est gentil hein?"),null);    
        });
        it('should return null - anno 1404 est un super jeu', function() 
        {
            Assert.equal(Anderson.whoIsIt("anno 1404 est un super jeu"),null);    
        });
    })})


// ------ test for who/what ---------
describe('anderson', function() {
describe('#whatIsIt', function() {
  
    it('should return Accordéon - c\'est quoi un accordéon?', function() 
    {
        Assert.equal(Anderson.whatIsIt("c'est quoi un accordéon?"),'Accordéon');    
    });
    it('should return Voiture - c\'est quoi une voiture?', function() 
    {
        Assert.equal(Anderson.whatIsIt("c'est quoi une voiture?"),'Voiture');    
    });
    
    it('should return Café - c quoi le café?', function() 
    {
        Assert.equal(Anderson.whatIsIt("c quoi le café?"),'Café');    
    });
    it('should return Accordéon - c quoi un accordéon?', function() 
    {
        Assert.equal(Anderson.whatIsIt("c quoi un accordéon?"),'Accordéon');    
    });
    it('should return Canard - c quoi du canard?', function() 
    {
        Assert.equal(Anderson.whatIsIt("c quoi du canard?"),'Canard');    
    });
    it('should return Méduse - c quoi des méduses ?', function() 
    {
        Assert.equal(Anderson.whatIsIt("c quoi des méduses ?"),'Méduse');    
    });
    it('should return null - qui est Barack Obama?', function() 
    {
        Assert.equal(Anderson.whatIsIt("qui est Barack Obama?"),null);    
    });
    it('should return null - il est gentil hein? !', function() 
    {
        Assert.equal(Anderson.whatIsIt("il est gentil hein?"),null);    
    });
    it('should return null - anno 1404 est un super jeu', function() 
    {
        Assert.equal(Anderson.whatIsIt("anno 1404 est un super jeu"),null);    
    });
})})

// ------ test for me ---------
describe('anderson', function() {
describe('#isMe', function() {
    it('should return true - salut anderson', function() 
    {
        Assert.equal(Anderson.isMe("salut anderson"),true);    
    });
    it('should return true - anderson, c\'est quoi un accordéon?', function() 
    {
        Assert.equal(Anderson.isMe("anderson, c\'est quoi un accordéon?"),true);    
    });
    it('should return true - hey andy!', function() 
    {
        Assert.equal(Anderson.isMe("hey andy!"),true);    
    });
    it('should return true - @aurea_bot pouet!', function() 
    {
        Assert.equal(Anderson.isMe("@aurea_bot pouet!"),true);    
    });
    it('should return null - il est gentil hein? !', function() 
    {
        Assert.equal(Anderson.isMe("il est gentil hein?"),false);    
    });
    it('should return null - anno 1404 est un super jeu', function() 
    {
        Assert.equal(Anderson.isMe("anno 1404 est un super jeu"),false);    
    });
})})


// ------ test for mhello ---------
describe('anderson', function() {
describe('#hello', function() {
    it('should return true - salut anderson', function() 
    {
        Assert.equal(Anderson.hello("salut anderson"),true);    
    });
    it('should return true - hello anderson', function() 
    {
        Assert.equal(Anderson.hello("hello anderson"),true);    
    });
    it('should return true - hey andy', function() 
    {
        Assert.equal(Anderson.hello("hey andy!"),true);    
    });
    it('should return true - bonjour @aurea_bot !', function() 
    {
        Assert.equal(Anderson.hello("bonjour @aurea_bot !"),true);    
    });
    it('should return true - coucou @aurea_bot !', function() 
    {
        Assert.equal(Anderson.hello("coucou @aurea_bot !"),true);    
    });
    it('should return null - il est gentil hein? !', function() 
    {
        Assert.equal(Anderson.hello("il est gentil hein?"),false);    
    });
    it('should return null - anno 1404 est un super jeu', function() 
    {
        Assert.equal(Anderson.hello("anno 1404 est un super jeu"),false);    
    });
})})


describe('anderson', function() {
    describe('#getInfoOf', function() {
        it('should return ["taille","barack obama"] - quelle est la taille de barack obama?', function() 
        {
            Assert.deepEqual(Anderson.getInfoOf("quelle est la taille de barack obama?"),["taille","barack obama"]);    
        });
        it('should return ["poids","fourmi"] - quel est le poids d\'une fourmi?', function() 
        {
            Assert.deepEqual(Anderson.getInfoOf("quel est le poids d'une fourmi?"),["poids","fourmi"]);    
        });
        it('should return null - c\'est quoi du canard?', function() 
        {
            Assert.equal(Anderson.getInfoOf("c'est quoi du canard?"),null);    
        });
        it('should return null - il est gentil hein? !', function() 
        {
            Assert.equal(Anderson.getInfoOf("il est gentil hein?"),null);    
        });
        it('should return null - anno 1404 est un super jeu', function() 
        {
            Assert.equal(Anderson.getInfoOf("anno 1404 est un super jeu"),null);    
        });
})})
    
