//--------------------------------------------
// NAME: Valentin Kirilov
// CLASS: XIa
// NUMBER: 6
// PROBLEM: #5
// FILE NAME: advanced-shell.c (unix file name)
// FILE PURPOSE:
// Програмата реализира advanced shell
//---------------------------------------------


#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>

int pipe_exist = 0;

int shell_pipe[2];
#define _STD_READ__ 0
#define _STD_WRITE__ 1

struct Job {
	char* command_;
	char** argv_;
	int stdin_;
	int stdout_;

} typedef Job;

int count_arguments(const char* cmdline) 
{
	int i=0;
	int arguments = 0;
	for(; i < strlen(cmdline); i++) {
		if(cmdline[i] == ' ') {
			arguments++;
			
			while(cmdline[i+1] == ' ') {
				i++;
			}
		}
	}
	 
	return arguments+1;
}

int count_array(char** array) 
{
	int i=0;
	int arguments = 0;
	while(array[i] != NULL) {
		arguments++;
		i++;
	}
	 
	return arguments;
}

char** parse_cmdline(const char* cmdline) 
{
	int arguments_count = count_arguments(cmdline);
	//printf("ARGUMENTS: %d <\n", arguments_count);
	
	char** parsed_cmd = (char**)malloc(sizeof(char**) * arguments_count);
	char* cmdlinee = (char*)cmdline;
	
	parsed_cmd[0] = strtok(cmdlinee," \n");
	
	int i=1;
	while (parsed_cmd[i-1] != NULL)
	{
		parsed_cmd[i] = (char*)malloc(sizeof(char*));
		parsed_cmd[i] = strtok (NULL, " \n");
		i++;
	}
	
	return parsed_cmd;
}

//--------------------------------------------
// FUNCTION: void run_command(Job job) 
// The function creating new proccess specifications and changes the stdin and stdout by given info
// PARAMETERS:
// Job job - structure with information for the new process
//----------------------------------------------
void run_command(Job job) {
	//printf("STDIN: %d\n", job.stdin_);
	//printf("STDOUT: %d\n", job.stdout_);

	//printf("command: %s\n", job.command_);
	//int i;
	//for(i=0; i < 10; i++) {
	//printf("[%d] = %s\n", i, job.argv_[i]);
	//printf("%d\n", i);
	//}

	dup2(job.stdin_, STDIN_FILENO);
	dup2(job.stdout_, STDOUT_FILENO);

	execv(job.command_, job.argv_);
}

int delete_argument(char** cmdline, int index) {
	
	int arguments_count = count_array(cmdline);
	for(; index < arguments_count; index++)
		cmdline[index] = cmdline[index+1];

	return 0;
}

int is_pipe_exist(char** cmdline) {
	int arguments_count = count_array(cmdline);
	int index = 0;
	for(; index < arguments_count; index++) {
		if(strcmp(cmdline[index], "|") == 0) {
			return 1;
		}
	}
	return 0;
}

char*** check_for_pipe(char** cmdline) {
	char*** piped_cmd = (char***)malloc(sizeof(char***) * 2);

	int arguments_count = count_array(cmdline);
	piped_cmd[0] = (char**)malloc(sizeof(char**) * arguments_count);

	int index = 0;
	int pipe_index = 0;
	int new_cmd_index = 0;

	while(cmdline[index] != NULL) {
		if(strcmp(cmdline[index], "|") == 0) {
			//printf(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PIPE\n");
			pipe_index = 1;
			piped_cmd[pipe_index] = (char**)malloc(sizeof(char**) * arguments_count);

			new_cmd_index = 0;
			delete_argument(cmdline, index);
		}
		piped_cmd[pipe_index][new_cmd_index] = (char*)malloc(sizeof(char*));
		piped_cmd[pipe_index][new_cmd_index] = cmdline[index];

		index++;
		new_cmd_index++;
	}

	return piped_cmd;
}

struct Job check_for_redirection(char** cmdline) {
	struct Job job;

	job.stdin_ = 0;
	job.stdout_ = 1;
	job.command_ = cmdline[0];

	int index = 0;
	while(cmdline[index] != NULL) {
		
		if(cmdline[index] != NULL) {
			if(strcmp(cmdline[index], "<") == 0) {
				delete_argument(cmdline, index);

				int fp;
	            fp = open(cmdline[index], O_RDONLY);
	            if (fp < 0) {
	                perror("open()");
				}
				else {
					job.stdin_ = fp;
	            	//dup2(fp, 0);
				}

	            delete_argument(cmdline, index);
	            continue;
			}	
		}
		
		if(cmdline[index] != NULL) {
			if(strcmp(cmdline[index], ">") == 0) {
				delete_argument(cmdline, index);
				int fd = open(cmdline[index], O_WRONLY | O_CREAT, 0777);
				if (fd < 0)	{
					perror("open()");
				}
				else {
					job.stdout_ = fd;
				}

				delete_argument(cmdline, index);
				continue;
			}
		}
		
		index++;
	}
	
	job.argv_ = cmdline;
	return job;
}

int main() {

	char read_line[128];

	while (fgets(read_line, 128, stdin) != NULL) 
	{
		if(strcmp(read_line, "\n") == 0) {

			continue;
		}

		char** parsed_line = parse_cmdline(read_line);

		if(is_pipe_exist(parsed_line) == 1) {
			if(pipe(shell_pipe) == -1) {
				perror("pipe()");
			}
		}

		int pid = fork();
		pid_t pid2;

		if (pid == 0) 
		{
			// Child process
			char*** piped_cmd = check_for_pipe(parsed_line);

			if(piped_cmd[1] != NULL) {
				// We have a pipe
				
				struct Job curr_job_child1 = check_for_redirection(piped_cmd[0]);
				struct Job curr_job_child2  = check_for_redirection(piped_cmd[1]);
				pid2 = fork();
				
				
				if (pid2 == 0)
				{
					// child
					
					close(shell_pipe[_STD_WRITE__]);
					dup2(shell_pipe[_STD_READ__], STDIN_FILENO);
					//execv(piped_cmd[1][0], piped_cmd[1]);
					run_command(curr_job_child2);
					close(shell_pipe[_STD_READ__]);

				}
				else if (pid2 > 0)
				{
					close(shell_pipe[_STD_READ__]);
					dup2(shell_pipe[_STD_WRITE__], STDOUT_FILENO);
					//execv(piped_cmd[0][0], piped_cmd[0]);
					run_command(curr_job_child1);
					close(shell_pipe[_STD_WRITE__]);
				}
				else 
				{
					perror("fork()");
				}
	
			}
			else {
				// We don't have a pipe
				char** cmd = piped_cmd[0];
				struct Job curr_job = check_for_redirection(cmd);
				run_command(curr_job);
			}
		} 
		else if (pid > 0) 
		{
			// Parent process
			int status;
			waitpid(pid, &status, -1);

			int status2;
			waitpid(pid2, &status2, -1);
		} 
		else 
		{
			// Fork
			perror("fork()");
		}

	}
	return 0;
}
