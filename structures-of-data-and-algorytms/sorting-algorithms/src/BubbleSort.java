import java.util.Arrays;;


public class BubbleSort {

	public static int[] sort(int[] array) {
		
		System.out.println(Arrays.toString(array));
		
		for (int i = 0; i < array.length; i++) {
			
			for (int j = 0; j < array.length; j++) {
				
				if (array[i] < array[j]) {
					array = Utils.swap(array, i, j);
				}
				
			}
		}
		
		
		System.out.println(Arrays.toString(array));
		return array;
	}

}
