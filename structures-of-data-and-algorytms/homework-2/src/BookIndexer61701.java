import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

/**
 * 
 */

/**
 * @author valentin
 *
 */
public class BookIndexer61701 implements IBookIndexer {
	
	private HashMap<Integer, String> bookMap = new HashMap<Integer, String>();
	private HashMap<String, KeywordIndexer> keywordsMap = new HashMap<String, KeywordIndexer>();

	/* (non-Javadoc)
	 * @see IBookIndexer#buildIndex(java.lang.String, java.lang.String[], java.lang.String)
	 */
	@Override
	public void buildIndex(String bookFilePath, String[] keywords,
			String indexFilePath) {
	
		// Init keywords
		for (String keywordName : keywords) {
		    // do some work here on intValue
			keywordsMap.put(keywordName, new KeywordIndexer(keywordName));
		}
		
		this.readFile(bookFilePath);	
		this.writeFile(indexFilePath);
	}
	
	private void readFile(String filename) {
		Scanner inputScanner = null;
		try {
			inputScanner = new Scanner(new FileReader(filename));
			String line;
			int readStatus = 0;
			Integer pageNumber = null;
			
			while(inputScanner.hasNextLine()) {
				line = inputScanner.nextLine();
				
				if (line.equals("")) {
					//System.out.println("Empty line");
					readStatus = 0;
				}
				else if (line.matches("(=== Page \\d+ ===)")) {
					line = line.replaceAll("(^=== Page )", "");
					line = line.replaceAll("( ===$)", "");
					pageNumber = Integer.parseInt(line);
					readStatus = 1;
					//System.out.println("Page line: " + pageNumber);
				}
				else {
					//System.out.println("Content: " + line);
					bookMap.put(pageNumber, line);
					
					// Solve the line
					for (KeywordIndexer keyword: keywordsMap.values()) {
						keyword.checkLine(line, pageNumber);
					}
				}
			}
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			inputScanner.close();
		}
	}

	private void writeFile(String filename) {
		PrintWriter writer = null;
		try {
			writer = new PrintWriter(filename, "UTF-8");
			writer.print("INDEX");
			
			Map<String, KeywordIndexer> treeMap = new TreeMap<String, KeywordIndexer>(keywordsMap);
			// Write results
			for (KeywordIndexer keyword: treeMap.values()) {
				writer.println();
				writer.print(keyword.getIndex());
			}
			
		} catch (FileNotFoundException | UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			writer.close();
		}
		
	}
	
}

class KeywordIndexer {
	
	private String keyword;
	private String regex;
	private LinkedList<Integer> found = new LinkedList<Integer>();
	
	KeywordIndexer(String name) {
		keyword = name;
		regex = "(?i:.*"+name+".*)";
	}
	
	public void checkLine(String line, Integer pageNumber) {
		//System.out.println(pageNumber + " " + keyword + ": " + regex);
		
		if (line.matches(regex)) {
			found.add(pageNumber);
		}
	}
	
	public String getIndex() {
		String result = keyword + ", ";
		Integer firstPage = -1;
		Integer lastPage = -1;
		boolean pagesSeries = false;
		
		Integer pageNumber = -1;
		for (int counter=0; counter <= found.size(); counter++) {
			if (counter != found.size()) {
				pageNumber = found.get(counter);
			}
			else {
				//pageNumber = 0;
			}
			
			//System.out.println("current: " + pageNumber + " last:" + lastPage + " series: " + pagesSeries + " first: " + firstPage);
			if (!pagesSeries && lastPage != pageNumber-1) {
				if (lastPage != -1) {
					//System.out.println("No series. Writing " + lastPage);
					result += lastPage + ", ";
				}
				lastPage = pageNumber;
			}
			else if (!pagesSeries && lastPage == pageNumber-1) {
				//System.out.println("Start series. First " + lastPage);
				firstPage = lastPage;
				lastPage = pageNumber;
				pagesSeries = true;
			}
			else if (pagesSeries && lastPage != pageNumber-1) {
				//System.out.println("End series. Writing First " + firstPage + " Last " + lastPage);
				result += firstPage + "-" + lastPage + ", ";
				firstPage = -1;
				lastPage = pageNumber;
				pagesSeries = false;
			}
			else if (pagesSeries && lastPage == pageNumber-1) {
				//System.out.println("Continue series. Writing First " + firstPage + " Last " + pageNumber);
				lastPage = pageNumber;
				pagesSeries = true;
			}
			
		}
		
		// Remove the last , 
		result = result.replaceAll("(, $)", "");
		
		//System.out.println(result);
		return result;
	}

	
}
