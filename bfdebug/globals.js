var bfuck_code //code
var debug_pos = 0 //position in string of debugger
var stack_size = 1000 //size of stack
var stack = new Array()
var stack_pointer = 0
var persec //number of commands executed per second
var timeout_id //this is the id of the process made by the timeout
var valids = ['.',',','[',']','<','>','+','-'] //valid bf commands
var first = true;