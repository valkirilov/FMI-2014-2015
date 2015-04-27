import java.util.Arrays;


public class QuickSort {

	public static void quicksort(int[] array, int left, int right) {
		
		if (right < left)
			return;
		
		int i = QuickSort.partition(array, left, right);
		QuickSort.quicksort(array, left, i-1);
		QuickSort.quicksort(array, i+1, right); 
		
		
	}
	
	static int partition(int a[], int l, int r)	{ 
		int i = l-1, j = r;
		int v = a[r];
		for (;;) { 
			while (less(a[++i], v));
				while (less(v, a[--j]))
					if (j == l) break;
				if (i >= j) break;
					exch(a, i, j);
		}

		a = Utils.swap(a, i, r);
		
		return i;
	} 

	public static int[] sort(int[] array, int left, int right) {

		QuickSort.quicksort(array, 0, array.length);
		
		
		return array;
	}

}
