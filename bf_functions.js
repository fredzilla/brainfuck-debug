//puts spaces conveniently in the code so that it will show up on different lines
function splitUp(code){
    i = 0;
    line_size = 21
    while(i < code.length){
        i += line_size
        code = code.substring(0,i) + " " + code.substring(i)
        i++
    }
    return code
}

//plays the thing at a rate of 4/sec
function play(){
    next();
    timeout_id = setTimeout("play()",1000/persec)
}
function stop_m(){
    clearTimeout(timeout_id)
}

//updates everything for the next command

function next(){
    if(!first){
        //run the command
        c = bfuck_code.substring(debug_pos-1,debug_pos)
        runBF(c)
    }else{first = false}
    nextCommand()
    showStack() //print the stack
    document.getElementById('code').innerHTML = makeBFHTML()
    debug_pos++
}



//tells if the char is a command
function isCommand(c){
    for(s = 0; s < valids.length; s++){
        if(c == valids[s]){
            return true;
        }
    }
    return false;
}

//find the next character that is not a comment
//returns true if there is another command, false otherwise
function nextCommand(){
    while(!isCommand(bfuck_code.substring(debug_pos,debug_pos+1)) && debug_pos < bfuck_code.length){
        debug_pos++
    }
    return (debug_pos < bfuck_code.length)
}



//runs a command in bf
function runBF(command){
    switch(command){
        case '>':
            stack_pointer++
            //stack_pointer %= stack_size
            break;
        case '<':
            stack_pointer--
            //if(stack_pointer < 0) stack_pointer = stack_size-1
            break;
        case '+':
            stack[stack_pointer]++
            break;
        case '-':
            stack[stack_pointer]--
            break;
        case '.':
            character = stack[stack_pointer]
            character = String.fromCharCode(character)
            document.getElementById('output').innerHTML += character
            break;
        case ',':
            ///gahhhhh how am i going to get input?
            //**LIGHT BULB** Input stream...
            chr = document.getElementById("input_text").value
            document.getElementById("input_text").value = chr.substring(1)
            x = chr.charCodeAt(0)
            if(x > 0)
                stack[stack_pointer] = x
            else
                stack[stack_pointer] = 0
            break;
        case '[':
            //IF THE CURRENT BYTE = 0, find the matching ] (the opposite of what you do at '[')
            if(stack[stack_pointer] == 0)
            {
                i = debug_pos + 1
                tomatch = 1
                
                while(tomatch > 0){    
                    chr = bfuck_code.substring(i,i+1)
                    if(chr == '['){tomatch++}
                    if(chr == ']'){tomatch--}
                    i++
                }
                debug_pos = i
            }
            break;
        case ']':
            //go to the matching [
            i = debug_pos - 1
            tomatch = 1
            
            //find the matching [
            while(tomatch > 0){
                i--;
                chr = bfuck_code.substring(i,i+1)
                if(chr == '['){tomatch--}
                if(chr == ']'){tomatch++}
            }
            debug_pos = i
            break;
        default:
            break;
    }
}