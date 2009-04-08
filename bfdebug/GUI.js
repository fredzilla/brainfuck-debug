//this function gets the page ready to debug.
function button_clicked(){
    document.getElementById('output').innerHTML = "" //clear ourput window
    stack_size = document.getElementById('stack_size').value //get the new stack size
    //create and initialize the stack
    stack = new Array()
    for(i = 0; i < stack_size; i++){stack[i] = 0}
    bfuck_code = splitUp(document.getElementById('myCode').value) //put the code into the code var
    stack_pointer = 0 //restart stack pointer
    debug_pos = 0 //init debug position
    next() //queue it up
}

//shows the stack in an HTML table
function showStack(){
    num_per_row = 20
    html = "";
    st = 0
    end = stack_pointer + 100
    if(stack_pointer > 100){
        html = "<-- More"
        st = stack_pointer - 100
    }
    if(end > stack_size) end = stack_size
    numPrinted = 0
    html += "<table><tr>"
    for(b = st; b < end; b++){
        html += "<td><table border='1'><tr>";
        if(b == stack_pointer){
            html += "<td><span style='background-color:#FF0000;'>" +
                b + "</span></td></tr><tr><td>" + stack[b] + "</td>"
        }
        else{
            html += "<td><span style='background-color: #00FF00;'>" +
                b + "</span></td></tr><tr><td>" + stack[b] + "</td>"
        }
        html += "</tr></table></td>"
        numPrinted++
        if(numPrinted % num_per_row == 0){
            html += "</tr><tr>"
        }
    }
    html += "</tr></table>"
    if(end != stack_size){
        html += "More -->";
    }
    
    document.getElementById('stack').innerHTML = html
}

//turns the brainfuck source into code with current char highlighted and comments marked
function makeBFHTML(){
    com_begin = "<span style='font-size: smaller;color:#008800'>"
    cur_begin = "<span style='color:#880000;font-size: xx-large;background-color:#FFB90F;'>"
    sub_begin = "<sub style='color:#cc0cbb;font-size:smaller;'>"
    sub_end = "</sub>"
    end = "</span>"
    
    html = ""
    loopDepth = 0 //this will show the subscript for the loop depth
    
    //go through each letter and mark comments
    for(i = 0; i < bfuck_code.length; i++)
    {
        curchar = bfuck_code.substring(i,i+1)
        good = isCommand(curchar) //if it's a command, then it's good
        
        if(i == debug_pos) //marks the current character
        {
            html += cur_begin + curchar + end
        }
        else if(!good){ //if it's a comment, mark it
            html += com_begin + curchar + end
        }
        else{ //if it's a command, and not the current one, then leave it alone.
            html += curchar
        }
        
        NEWLINE = 10
        LEFTSQ = 91
        RIGHTSQ = 93
        switch(curchar.charCodeAt(0)){
            case NEWLINE:
                html += "<br/>"
                break;
            case LEFTSQ:
                html += sub_begin + loopDepth + sub_end
                loopDepth++
                break;
            case RIGHTSQ:
                loopDepth--
                html += sub_begin + loopDepth + sub_end
                break;
            default:
                break;
        }
    }
    
    return html
}