#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
 
int main() {
    printf("Hello from process: %d with parent: %d\n", getpid(), getppid());
    int pid = fork();
    if (pid == 0) 
    {
        printf("Hello world from child process!\n");
        //execl("/bin/ls", "/bin/ls", "-l", "-a", NULL);

                // busy
        int i;
        for (i = 0; i < (1 << 30); i++);
        for (i = 0; i < (1 << 30); i++);
        for (i = 0; i < (1 << 30); i++);
        for (i = 0; i < (1 << 30); i++);
        for (i = 0; i < (1 << 30); i++);   
        printf("Bye from child!\n");
        perror("execl()");
    } 
    else if (pid > 0) 
    {
        printf("Hello form parent process!\n");
 
        int status;
        printf("Waiting for child...\n");
        wait(&status); //== waitpid(0, &status, -1);
        //waitpid(WAIT_ANY, &status, 0);
        printf("Child finished: status = %d\n", status);
    } 
    else
    {
        printf("fork();\n");
    }
 
    return 0;
}