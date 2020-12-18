const fs = require('fs')

const command = process.argv[2]
const payload = process.argv[3]

const addPayload = (payload) => {

    if(payload===undefined){
        console.log('Error: Missing todo string. Nothing added!')
        return
    }

    fs.appendFileSync('todo.txt',payload+'\n')
    console.log(`Added todo: "${payload}"`)
}

const showRemaining = ()=>{
    try{
        const list = fs.readFileSync('todo.txt').toString('utf8').split('\n')

        list.pop()
        list.reverse()
        let size=list.length
        let result = ''

        for(i=0;i<size;i++){
            result += `[${size-i}] ${list[i]}\n`
        }
        console.log(result)   
    }
    catch(err){
        console.log('There are no pending todos!')
    }
} 

const deleteTodo = (payload) => {
    
    const list = fs.readFileSync('todo.txt').toString()
    a=list.split('\n')
    a.pop()
    if(payload<1 || payload>a.length)
    {
        console.log(`Error: todo #${payload} does not exist. Nothing deleted.`)
        return
    }
    a.splice(payload-1,1)
    console.log(`Deleted todo #${payload}`)
    let b=''
    for(i=0;i<a.length;i++)
        {
            b=b+a[i]+'\n'
        }
    fs.writeFileSync('todo.txt',b)
}

const complete = (payload)=>{
    
    const list = fs.readFileSync('todo.txt').toString()
    a=list.split('\n')
    a.pop()
    if(payload<1 || payload>a.length)
    {
        console.log(`Error: todo #${payload} does not exist.`)
        return
    }
    const deleted =  a.splice(payload-1,1)
    console.log(`Marked todo #${payload} as done.`)
    let b=''
    for(i=0;i<a.length;i++)
        {
            b=b+a[i]+'\n'
        }
    fs.writeFileSync('todo.txt',b)
    fs.appendFileSync('done.txt',`x ${new Date().toISOString().slice(0,10)} ${deleted}\n`)

}

const help = ( ) =>{
    let usage = `Usage :-
$ ./todo add "todo item"  # Add a new todo
$ ./todo ls               # Show remaining todos
$ ./todo del NUMBER       # Delete a todo
$ ./todo done NUMBER      # Complete a todo
$ ./todo help             # Show usage
$ ./todo report           # Statistics`
    console.log(usage)
}

const statistics = ()=>{
    const list = fs.readFileSync('todo.txt').toString()
    a=list.split('\n')
    a.pop()
    const list1 = fs.readFileSync('done.txt').toString()
    b=list1.split('\n')
    b.pop()
    const toBePrint = ((new Date().toISOString().slice(0,10))+' Pending : '+a.length+' Completed : '+b.length).trim().toString('utf8')
    console.log(toBePrint)

}
switch(command){
    case undefined: help()
                    break 

    case 'add' : addPayload(payload)
                    break
    case 'ls' : showRemaining()
                    break
    case 'del': if(payload===undefined){
                    console.log('Error: Missing NUMBER for deleting todo.')
                    break
                }
                else{
                    deleteTodo(Number(payload))
                    break
                }
    case 'done':
                    if(payload===undefined){
                        console.log('Error: Missing NUMBER for marking todo as done.')
                        break
                    }else{
                        complete(Number(payload))
                        break
                    }
                
    case 'help' : help()
                    break
    case 'report': statistics()
                    break
    default :   console.log('error')

}