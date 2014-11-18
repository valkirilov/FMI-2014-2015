import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.LinkedList;

import com.sun.org.apache.bcel.internal.generic.AALOAD;


public class MainClass {

	public static void main(String[] args) throws FileNotFoundException, UnsupportedEncodingException {
		String encodeSourceFile = "source-encode.txt";
		String encodeDestinationFile = "destination-encode.txt";
		String decodeDestinationFile = "destination-decode.txt";
		
		LinkedList<Character> keysEncode = new LinkedList<Character>();
		LinkedList<Character> keysDecode = new LinkedList<Character>();
		
		int[] keysEncodeArray = { 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0 };
		int[] keysDecodeeArray = { 0, 5, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		
		for (int i = 0; i < keysEncodeArray.length; i++) {
			keysEncode.add((char) keysEncodeArray[i]);
		}
		for (int i = 0; i < keysDecodeeArray.length; i++) {
			keysDecode.add((char) keysDecodeeArray[i]);
		}
		
		FileEncoder61701 fileEncoder = new FileEncoder61701();
		fileEncoder.encode(encodeSourceFile, encodeDestinationFile, keysEncode);
		fileEncoder.decode(encodeDestinationFile, decodeDestinationFile, keysDecode);		
		
	}

}
