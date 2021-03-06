_.mixin({
    isset: function(param) {
        return !_.isUndefined(param);
    },

    deepClone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    pad: function (n, width, padding, leftOrRight) {
        if (_.isUndefined(leftOrRight)) {
            leftOrRight = "right";
        }

        padding = padding || '0';
        n = n + '';
        if (n.length < width) {

            var padding_string = new Array(width - n.length + 1).join(padding);

            return leftOrRight === "left"
                ? padding_string + n
                : n + padding_string;

        } else {
            return n;
        }
    },

    pluckUnique: function(obj, key) {
        return _.unique(_.pluck(obj, key));
    },

    mapObject: function(object, f, context) {
        var result = {};
        _.each(object, function(v, k) {
            result[k] = f.call(context, v, k);
        });
        return result;
    },


    mapWithKey: function(object, f, context) {
        return _.pluralize(object).reduce(function(memo, value, key) {
            var result = f.call(context, value, key);
            memo[result[0]] = result[1];
            return memo;
        }, {});
    },

    hashList: function(list) {
        var result_hash = {};
        _.each(list, function(v) {
            result_hash[v] = true;
        });
        return result_hash;
    },

    arrayContentsMatchKey: function(array1, array2) {
        return (
               array1.length === array2.length
            && _(array1).all(function(e, idx) {
                return array2[idx] === e;
            })
        );
    },

    arrayContentsMatch: function(array1, array2) {
        return (
               array1.length === array2.length
            && _.difference(array1, array2).length === 0
        );
    },

    pluralize: function(input) {
        if (input instanceof _) {
            return input;
        }

        var array;
        if (input instanceof Backbone.Collection) {
            array = input.models;
        } else if (_.isArray(input)) {
            array = input;
        } else if (_.isArguments(input)) {
            array = _.toArray(input);
        } else {
            array =[input];
        }
        return _(array);
    },

    templateById: function(id){
        // We create this variable outside the factored function scope
        // to have the option to only look up the DOM-ELement _once_
        // First time the factored template funcion get called, the DOM-element
        // is looked up and saved inside this "slightly out of scope" variable.
        var tplString;

        return function(options){
            if(_.isUndefined(tplString)){
                var tpl = document.getElementById(id);
                if( _.isUndefined( tpl ) || _.isNull( tpl ) ){
                    console.log("Template not found: "+id);
                    return false;
                }

                tplString = tpl.innerHTML;
            }


            var tplOut = _.template( tplString );
            return tplOut.call(this, options);
        };
    },

    groupBySubsequent: function(values, f, context) {
        var _last_value = null;
        var _current_key = null;
        return _.groupBy(values, function(current_value) {
            if (!_current_key) {
                _current_key = current_value;
            } else if (!f.call(context, _last_value, current_value)) {
                _current_key = current_value;
            }
            _last_value = current_value;
            return _current_key;
        });
    },



    ////////////////////////
    // underscore-contrib //
    ////////////////////////

    isNumeric: function(n) {
        return !_.isNaN(parseFloat(n)) && _.isFinite(n);
    },

    // An integer contains an optional minus sign to begin and only the digits 0-9
    // Objects that can be parsed that way are also considered ints, e.g. "123"
    // Floats that are mathematically equal to integers are considered integers, e.g. 1.0
    // See here for more discussion: http://stackoverflow.com/questions/1019515/javascript-test-for-an-integer
    isInteger: function(i) {
        return _.isNumeric(i) && i % 1 === 0;
    },

    // A float is a numbr that is not an integer.
    isFloat: function(n) {
        return _.isNumeric(n) && !_.isInteger(n);
    },

});
