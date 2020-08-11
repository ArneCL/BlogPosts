title: Makefile basics
date: 2012-03-16 23:30:13
tags: unix, unix-makefile

This makefile will have two commands. All and clean. These are on the lines as all: and clean:

Their first line will state 'dependencies'. The second will issue the commands. The second has to have a tab infront of it.

For each dependency, it looks up another command. If there were a file.o depdency, it would look up file.o:. If a dependency can't be found in the makefile it looks for an actual file in the directory.

At the top of the file the key values are the constants in the file. Their accessed via $(NAME) later.

% before text will specify a wildcard. $< specifies whatever was the dependency. So in all: main.c, $< would refer to main.c.

		OBJS=main.o
		CFLAGS=-O3
		LIBS=
		PROG=main
		
		all:$(OBJS)
			gcc -o $(PROG) $(LIBS) $(OBJS)
		
		%o:%c 
			gcc $(CFLAGS) -c $<
		
		clean:
			rm -rf $(PROG) $(OBJS)

