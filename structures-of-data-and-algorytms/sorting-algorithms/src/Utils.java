
public class Utils {

	public static int[] swap(int[] array, int firstPosition, int secondPosition) {
		
		int temp = array[secondPosition];
		array[secondPosition] = array[firstPosition];
		array[firstPosition] = temp;
		
		return array;
	}

}
