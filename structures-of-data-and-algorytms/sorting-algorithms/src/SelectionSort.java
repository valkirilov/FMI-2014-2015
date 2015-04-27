import java.util.Arrays;


public class SelectionSort {

	public SelectionSort() {
		
	}
	
	public static int[] sort(int[] array) {
		
		System.out.println(Arrays.toString(array));
		for (int i = 0; i < array.length; i++) {
			
			// Find the min element
			int minElement = i;
			for (int j = i+1; j < array.length; j++) {
				if (array[j] <= array[minElement]) {
					minElement = j;
				}
			}
			
			// Swap it with the i-th element
			Utils.swap(array, i, minElement);
		}
		
		System.out.println(Arrays.toString(array));
		return array;
	}

}
