define(['Backbone'],
        function(Backbone) {
    
    var Card = Backbone.Model.extend({
        
        CARDS: {"A": {sequence: 0,  weight: 12},
                "2": {sequence: 1,  weight: 0},
                "3": {sequence: 2,  weight: 1},
                "4": {sequence: 3,  weight: 2},
                "5": {sequence: 4,  weight: 3},
                "6": {sequence: 5,  weight: 4},
                "7": {sequence: 6,  weight: 5},
                "8": {sequence: 7,  weight: 6},
                "9": {sequence: 8,  weight: 7},
                "T": {sequence: 9,  weight: 8},
                "J": {sequence: 10, weight: 9},
                "Q": {sequence: 11, weight: 10},
                "K": {sequence: 12, weight: 11}},
        
        initialize: function(cardCode) {
            this.code = cardCode;
            
            this.number = cardCode.slice(0,1);
            this.suit = cardCode.slice(1,2);
            
            this.sequence = this.CARDS[this.number].sequence;
            this.weight = this.CARDS[this.number].weight;
        }
    });

    return Card;
});