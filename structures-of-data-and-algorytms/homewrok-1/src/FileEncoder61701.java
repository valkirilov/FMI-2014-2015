
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Scanner;

public class FileEncoder61701 implements FileEncoderFN {
	
	LinkedList<Integer> primeNumbers = new LinkedList<Integer>(Arrays.asList(1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251));
	
	public void encode(String sourceFile, String destinationFile, LinkedList<Character> key) throws FileNotFoundException, UnsupportedEncodingException {	
		LinkedList<Integer> sourceContent = this.readFile(sourceFile);
		LinkedList<Integer> encoded = this.encodeString(sourceContent, key);
		this.writeFile(destinationFile, encoded);
	}
	public void decode(String encodedFile, String destinationFile, LinkedList<Character> key) {
		System.out.println("TO DO");
	}
	
	private LinkedList<Integer> encodeString(LinkedList<Integer> source,  LinkedList<Character> key) {
		LinkedList<Integer> result = new LinkedList<Integer>();
		
		for (int i = 0; i < source.size(); i++) {
			if (this.isPrime(i)) {
				result.add(source.get(i));
			}
			else {
				Integer value = (int)key.get(i);
				result.add(value);
			}
		}
		
		return result;
	}

	
	private LinkedList<Integer> readFile(String fileName) throws FileNotFoundException {
		LinkedList<Integer> content = new LinkedList<Integer>();
		Scanner fileScanner;
		fileScanner = new Scanner(new File(fileName));
		while (fileScanner.hasNextInt()){
			content.add(fileScanner.nextInt());
		}
		fileScanner.close();
		return content;
	}
	private void writeFile(String fileName, LinkedList<Integer> data) throws FileNotFoundException, UnsupportedEncodingException {
		PrintWriter writer = new PrintWriter(fileName, "UTF-8");
		
		boolean isNotFirst = false;
		for (Integer integer : data) {
			if (isNotFirst)
				writer.print(' ');
			else
				isNotFirst = true;
			
			writer.print(integer + " ");
		}
		writer.close();
	}
	
	private boolean isPrime(int number) {
		if (primeNumbers.contains(number))
			return true;
		return false; 
	}
	
//	private boolean isPrime(int number) {
//		
//		if (number == 0)
//			return false;
//		if (number == 1)
//			return true;
//		
//		for(int i=2; i<=number/2; i++){
//            if(number % i == 0){
//                return false;
//            }
//        }
//        return true;
//	}
//	private LinkedList<Integer> generatePrimeNumbers(int max) {
//		LinkedList<Integer> primeNumbers = new LinkedList<Integer>();
//		
//		for (int i = 0; i < max; i++) {
//			if(this.isPrime(i))
//				primeNumbers.add(i);
//		}
//		
//		return primeNumbers;
//	}
	
}
