import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.LinkedList;

import com.sun.org.apache.bcel.internal.generic.AALOAD;


public class MainClass {

	public static void main(String[] args) throws FileNotFoundException, UnsupportedEncodingException {
		String sourceFile = "source.txt";
		String destinationFile = "destination.txt";
		LinkedList<Character> keys = new LinkedList<Character>();
		
		int[] keysArray = { 123, 101, 111, 222, 251, 42 };
		for (int i = 0; i < keysArray.length; i++) {
			keys.add((char) keysArray[i]);
		}
		
		FileEncoder61701 fileEncoder = new FileEncoder61701();
		fileEncoder.encode(sourceFile, destinationFile, keys);
	}

}
