const {Bootstrap} = require('./components/Bootstrap/Bootstrap');
const {ToDo} = require('./components/ToDo/ToDo');
const Home = ((project)=>{
    let node = (()=>{
        let node = document.createElement('section');
        node.id = 'main';
        return node;
    })();

    let tasksContainer = ((parentNode, id)=>{
        let obj = Bootstrap.createElement('div',['container-fluid'],parentNode);
        let node = obj.node;
        node.id = id;

        let table = ((parentNode, project)=>{
            let obj = Bootstrap.createElement('table',['table','table-dark'],parentNode);
            let node = ((node, id)=>{
                node.id = id;
                return node;
            })(obj.node, 'taskTable');

            let head = ((parentNode, project)=>{
                let obj = Bootstrap.createElement('thead',[],parentNode);
                let node = obj.node;
                let row = ((headers, parentNode)=>{
                    let node = Bootstrap.createElement('tr',['text-capitalize', 'text-center'],parentNode).node;
                    headers.forEach((headText)=>{
                        let th = document.createElement('th');
                        th.textContent = headText;
                        th.scope = 'col';
                        node.appendChild(th);
                    });
                    return {node}
                })([project.name],node);

                return {node}
            })(obj.node, project);

            let body = ((parentNode)=>{
                let node = Bootstrap.createElement('tbody',[],parentNode).node;

                return {node}
            })(obj.node);

            return {body,head,node}
        })(node, project);

        return {node,table}

    })(node, 'taskTableContainer');



    let taskCreator = ((parentNode)=>{
        let container = Bootstrap.createElement('div',['container-fluid'],parentNode);
        let inputCssClasses = ['form-control','form-control-sm', 'bg-transparent', 'border-0', 'text-light'];
        container.node.id = 'taskCreatorContainer';
        container.row = Bootstrap.createElement('div',['row','h-100', 'm-1' ,'card', 'bg-transparent', 'border-secondary'],container.node);
        container.row.col = Bootstrap.createElement('div',['col','d-flex', 'flex-column', 'justify-content-center'],container.row.node);
        container.row.col.form = Bootstrap.createElement('form',[],container.row.col.node);
        container.row.col.form.rows = ((parentNode, rowQuantity)=> Array.from(Array(rowQuantity)).map(()=> Bootstrap.createElement('div',['form-row'], parentNode)))(container.row.col.form.node,2);
        let top = ((row, placeHolderText, inputCss)=>{
            let col = ((parentNode)=> Bootstrap.createElement('div',['col'],parentNode))(row.node);
            col.input = ((parentNode)=> Bootstrap.createElement('input',inputCss,parentNode))(col.node);
            col.input.node.placeholder = placeHolderText;
            return {col}
        })(container.row.col.form.rows[0], 'Task Description', inputCssClasses);

        let bottom = ((row, inputCss)=>{
            let columns = ((parentNode, columnQuantity)=> Array.from(Array(columnQuantity)).map(()=>Bootstrap.createElement('div',['col-auto'],parentNode)))(row.node,3);
            columns[0].dateInput = ((parentNode)=> Bootstrap.createElement('input',inputCss,parentNode))(columns[0].node);
            columns[0].dateInput.node.type = 'Date';
            columns[1].buttonGroup = ((parentNode)=> Bootstrap.createElement('div', ['btn-group', 'btn-group-sm'],parentNode))(columns[1].node);
            columns[1].buttonGroup.buttons = ((parentNode, quantity, buttonClasses)=> Array.from(Array(quantity)).map((elem,index)=>{
                let obj = Bootstrap.createElement('div',['btn', ...buttonClasses[index]],parentNode);
                obj.node.textContent = index;
            }))(columns[1].buttonGroup.node,3,[['btn-outline-primary'], ['btn-outline-success'], ['btn-outline-danger']]);
            columns[2].newTaskButton = ((parentNode)=> Bootstrap.createElement('div',['btn','btn-success', 'btn-sm'],parentNode))(columns[2].node);
            columns[2].newTaskButton.node.textContent = 'New Task';
        })(container.row.col.form.rows[1], inputCssClasses);
    })(node);


    return {node, tasksContainer}
})(ToDo.currentProject);

module.exports = {
    Home:Home
};