#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[])
{
	
	#define R 0
	#define W 1

	int my_pipe[2];
	pipe(my_pipe);

	pid_t pid = fork();
	if (pid == 0){
		// child
		close(my_pipe[W]);
		char buff[6];
		read(my_pipe[R], buff, 6 * sizeof(char));
		close(my_pipe[R]);

		write(STDOUT_FILENO, buff, 6 * sizeof(char));
	}
	else if (pid > 0) {
		// parent
		close(my_pipe[R]);
		char hello[] = "Hello\n";
		write(my_pipe[W], hello, 6 * sizeof(char));
		close(my_pipe[W]);
	}
	else {
		perror("fork()");
	}

	return 0;
}
