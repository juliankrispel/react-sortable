const React = require('react/addons');

var getDdItem = function(element, key){
    if(element.dataset.id === key){
        return element;
    }else if(!element.parentElement){
        return false;
    }else if(element.parentElement.dataset.id === key){
        return element.parentElement;
    }else{
        return getDdItem(element.parentElement);
    }
}

var isChildOfDdItem = function(element, key){
    return element.dataset.id !== key && getDdItem(element.parentElement, key);
};

var Sortable = React.createClass({
    displayName: 'Sortable',

    makeRange: function(count){
        return Array.apply(null, Array(count))
            .map(function (_, i) {return i;});
    },

    propTypes: {
        onSort: React.PropTypes.func,
        data: React.PropTypes.array
    },

    getDefaultProps: function(){
        return { items: [] };
    },

    onDrop: function(index, e){
        var target = getDdItem(e.target, 'dd-item-'+index);
        if(target){
            this.dropIndex = index;
            this.dropTarget = target;
            target.classList.remove('dragover');
        }
    },

    onDragOver: function(index, e){
        var target = getDdItem(e.target, 'dd-item-'+index);
        if(target){
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }
            e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
            target.classList.add('dragover');
            this.dragEnterTarget = target;
        }
    },

    isDdItem: function(element, ddId){
        return element.dataset.id && 
            element.dataset.id.indexOf(ddId) > -1;
    },

    onDragStart: function(index, e){
        var target = getDdItem(e.target, 'dd-item-'+index);
        if(target){
            target.classList.add('dragging');
        }
    },

    onDragLeave: function(index, e){
        if(this.isDdItem(e.target, 'dd-item-'+index) && !isChildOfDdItem(e.currentTarget, 'dd-item-'+index)){
            e.target.classList.remove('dragover');
        }
    },

    onDragEnd: function(index, e){
        var target = getDdItem(e.target, 'dd-item-'+index);
        if(target){
            target.classList.remove('dragging');
        }
        if(target && 
           this.dropIndex &&
           this.dropIndex !== index){
            var order = this.props.data || this.makeRange(this.props.children.length);

            order = this.moveItemInArray(this.dropIndex, index, order);

            this.dropTarget.classList.remove('dragover');
            this.dropIndex = null;
            this.dropTarget = null;
            this.props.onSort(order);
        }
    },

    moveItemInArray: function(from, to, array){
        if(to > from){
            to++;
        }

        array.splice(to, 0, array[from]);

        if(to < from){
            from++;
        }
        array.splice(from, 1);

        return array;
    },

    render: function(){
        var _this = this

        return <ol>
            {this.props.children.map(function(child, index){
                var bum = 'dd-item-'+index
                return <li
                    key={index}
                    data-id={bum}
                    onDragEnd={_this.onDragEnd.bind(_this, index)}
                    onDragOver={_this.onDragOver.bind(_this, index)}
                    onDragStart={_this.onDragStart.bind(_this, index)}
                    onDragLeave={_this.onDragLeave.bind(_this, index)}
                    onDrop={_this.onDrop.bind(_this, index)}
                    draggable="true">{child}</li>
            })}
        </ol>
    }
});

module.exports = Sortable;
