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
        Assert.equal(Anderson.isForHour("quel heure est t il"),true);    
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