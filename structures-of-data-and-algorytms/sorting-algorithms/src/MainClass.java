import java.util.Arrays;


public class MainClass {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		int input[];
		
		input = new int[] { 1, 3, 5, 7, 1, 2, 5, 3, 7 };
		System.out.println("Selection Sort!");
		SelectionSort.sort(input);
		
		input = new int[] { 1, 3, 5, 7, 1, 2, 5, 3, 7 };
		System.out.println("Insertion Sort!");
		InsertionSort.sort(input);
		
		input = new int[] { 1, 3, 5, 7, 1, 2, 5, 3, 7 };
		System.out.println("Bubble Sort!");
		BubbleSort.sort(input);
		
		
		input = new int[] { 1, 3, 5, 7, 1, 2, 5, 3, 7 };
		System.out.println("Quick Sort!");
		System.out.println(Arrays.toString(input));
		BubbleSort.sort(input);
		System.out.println(Arrays.toString(input));
		
	}

}
