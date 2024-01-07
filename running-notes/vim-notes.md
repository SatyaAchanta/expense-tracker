

- Open a file in vim editor using `vi <path_to_file_name>`

## Important Points

- 4 modes
	- normal mode ~ just move cursor around
	- insert mode ~ can type regular editor
	- visual mode ~ highlighting with cursor
	- command mode ~ pressing `:` 
		- `:w` ~ save the editor
		- `:q` ~ quite the editor
	- practice command with game:
		- `:VimBeGood`
		- Need to add this plugin
		- press `dd` at line `hjkl` , this will start a game. This game helps to build muscle memory
### Modes

#### Normal mode: 

Called as `Vim motion`. Motion is anything that moved motion

- `h` - move left
- `j` ~ move down 
- `k` ~ move up
- `l` - right
- `w` - moves forward with per every word
- `b` - moves backward per every word
- `d` - delete
	- `dd` - delete current line
	- `u` - undo
	- `ctlr + r` - redo previous action

Examples:

- `8k` - takes the cursor `:luc_arrow_big_up:` 8 times `UP` in the file
- `16j` - takes the cursor :luc_arrow_big_down:  16 times in the file
- `7dd` - deleted 7 lines :luc_arrow_big_down: from line where your cursor is
- `3u` - undo the last3 changes in the file


#### Insert mode

- `a` - moves cursor to the right side of the curosr
	- Generally when we enter into insert mode, `vim` types the characters on the left side of the cursor

- `v` - Visual mode
	- Can be used any motions we learned so far


## Search mode

- hit `/` in command mode and enter the string
	- For example: `/schema` - it takes you to the first character of first search result
	- to navigate down the results - lower case `n`
	- to navigate upwards - upper case `N`
- ### Search and replace
	- To search and replace , type `:` and then `%s/<actual_string>/<new_string>/gc`
		- `g` - stands for greedy ~ means replace every occurence not just first match
		- `c` - stands for confirmation - ask for confirmation for every replacement


## Command mode

- all the above commands can be performed in command mode
	- to go to starting of the file `[[` or `gg`
	- to go to ending of the file `]]` or `shift + g`
	- to go to certain line `<line_number>gg` ~ `47gg`
	- 69G


## Copy 

- `copy` ==== `yank` in vim's terminology
- to copy the text we use `y` key
- `yiw` - copy the current word
- `yw` - copy from cursor to the start of the next word
- `yb` - copy from cursor to the end of the previous word
- `yy` - copy the whole line
- `y$` - copy from current cursor location to the end of the line
- `4yy` - copy 4 lines from the line where cursor is , including current line


## Cut

- `diw` - delete current word
- `dw` -  delete from cursor location to start of the next word
- `db` - delete from cursor location to end of the previous words
- `dd` - delete the whole line
- `4dd` - delete 4 lines from the where cursor is, including current line
- `d$` - delete from current cursor location to end of the line
- `d^` - delete from cursor location to the start of line



## Search for files and across files:

- `Space + s + f` - opens up menu for find files
- `gd` - go to definition of the file
- `Telescope keymaps`
	- Find all possible keymaps those can be helpful in searching and sorting
- `Mason`
	- to install any of the language server supported
- `Telescope help_tags`
	- Shows all help tags