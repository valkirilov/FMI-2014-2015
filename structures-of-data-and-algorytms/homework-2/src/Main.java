
public class Main {

	public static void main(String[] args) {
		
		BookIndexer61701 bookIndexer = new BookIndexer61701();
		String[] keywords = new String[] { "lorem", "quisque", "aenean" };
		String bookFilePath = "test/test1/input.txt";
		String indexFilePath = "test/test1/output.txt";
		
		
		bookIndexer.buildIndex(bookFilePath, keywords, indexFilePath);
		
	}

}
