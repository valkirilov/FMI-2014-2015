#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <errno.h>
#include <unistd.h>

int main(int argc, char const *argv[])
{
  int file_pointer_input, file_pointer_output;
  char* input_filename = "input.io";
  char* output_filename = "output.o";
  char buffer[64];

  file_pointer_input = open(input_filename, O_RDWR);
  file_pointer_output = open(output_filename, O_RDWR | O_APPEND);

  if (file_pointer_output == -1) {
    file_pointer_output = open(output_filename, O_CREAT, S_IWRITE | S_IREAD);    
  }

  if(errno == 13) {
      printf("Permission denied\n");
      return 5;
  }

  char current_char[1];
  int readed, written;
  while(1) {
    readed = read(file_pointer_input, current_char, 1);  

    if (readed == 0) {
      break;
    }
    
    if (current_char[0] >= 48 && current_char[0] <= 52) {
      written = write(file_pointer_output, current_char, 1);
      printf("Write %d %d\n", file_pointer_output, written);
    }
  };
  
  printf("End if file\n");

  close(file_pointer_input);
  close(file_pointer_output);

  return 0;
}