var Assert = require('assert');
var Anderson = require('../anderson')


//-------- test for question -----------
describe('anderson', function() {
describe('#isQuestion', function() {
    it('should return true - quel jour sommes-nous', function() 
    {
        Assert.equal(Anderson.isQuestion("quel jour sommes-nous"),true);    
    });
    it('should return true - somme nous bete', function() 
    {
        Assert.equal(Anderson.isQuestion("somme nous bete"),true);
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
    it('should return true - bon, il est quelle heure', function() 
    {
        Assert.equal(Anderson.isForHour("bon, il est quel heure"),true);
    });
    it('should return false - A quelle heure a tu cours d anglais ?', function() 
    {
        Assert.equal(Anderson.isForHour("A quelle heure a tu cours d anglais ?"),false);    
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


// ------ test for who/what ---------
describe('anderson', function() {
describe('#whatIsIt', function() {
    it('should return Barack Obama - qui est Barack Obama?', function() 
    {
        Assert.equal(Anderson.whatIsIt("qui est Barack Obama?"),"Barack Obama");    
    });
    it('should return Accordéon - c\'est quoi un accordéon?', function() 
    {
        Assert.equal(Anderson.whatIsIt("c'est quoi un accordéon?"),'Accordéon');    
    });
    it('should return Voiture - c\'est quoi une voiture?', function() 
    {
        Assert.equal(Anderson.whatIsIt("c'est quoi une voiture?"),'Voiture');    
    });
    it('should return Accordéon - c quoi un accordéon?', function() 
    {
        Assert.equal(Anderson.whatIsIt("c quoi un accordéon?"),'Accordéon');    
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
