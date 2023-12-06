package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func ex01() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	ranges := [][][3]int64{}

	ranges = append(ranges, [][3]int64{})

	range_idx := 0

	seeds := []int64{}

	seeds_char := strings.Split(lines[0][7:], " ")
	for _, seed := range seeds_char {
		i, err := strconv.ParseInt(seed, 10, 64)
		if err != nil {
			panic(err)
		}
		seeds = append(seeds, i)
	}

	for _, line := range lines[3:] {
		rang := ranges[range_idx]

		if strings.Index(line, ":") != -1 {
			range_idx++
			ranges = append(ranges, [][3]int64{})
		} else {
			var to_add [3]int64

			count, err := fmt.Sscanf(line, "%d %d %d", &to_add[0], &to_add[1], &to_add[2])
			if err != nil {
				// panic(err)
			}

			if count != 3 {
				continue
			}

			ranges[range_idx] = append(rang, to_add)
		}
	}

	lowest := int64(10000000000000)

	for _, seed := range seeds {
		for ridx, r := range ranges {
			altered := false

			for i := 0; i < len(r) && altered == false; i++ {
				if seed >= r[i][1] && seed < r[i][1]+r[i][2] {
					offset := r[i][1] - r[i][0]

					seed -= offset
					altered = true
				}
			}

			fmt.Printf("After map %d: %d\n", ridx, seed)
		}
		fmt.Printf("After all: %d\n", seed)
		if seed < lowest {
			lowest = seed
		}
	}

	println(lowest)
}

func ex02_run(ranges [][][3]int64, seed int64) int64 {

	for _, r := range ranges {
		altered := false

		for i := 0; i < len(r) && altered == false; i++ {
			if seed >= r[i][1] && seed < r[i][1]+r[i][2] {
				offset := r[i][1] - r[i][0]

				seed -= offset
				altered = true
			}
		}

		// fmt.Printf("After map %d: %d\n", ridx, seed)
	}

	return seed
}

func ex02() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	ranges := [][][3]int64{}

	ranges = append(ranges, [][3]int64{})

	range_idx := 0

	// seeds := []int64{}

	seeds_char := strings.Split(lines[0][7:], " ")

	for _, line := range lines[3:] {
		rang := ranges[range_idx]

		if strings.Index(line, ":") != -1 {
			range_idx++
			ranges = append(ranges, [][3]int64{})
		} else {
			var to_add [3]int64

			count, err := fmt.Sscanf(line, "%d %d %d", &to_add[0], &to_add[1], &to_add[2])
			if err != nil {
				// panic(err)
			}

			if count != 3 {
				continue
			}

			ranges[range_idx] = append(rang, to_add)
		}
	}

	lowest := int64(10000000000000)

	// for _, seed := range seeds {
	// 	fmt.Printf("Before %d\n", seed)

	// 	for _, r := range ranges {
	// 		altered := false

	// 		for i := 0; i < len(r) && altered == false; i++ {
	// 			if seed >= r[i][1] && seed < r[i][1]+r[i][2] {
	// 				offset := r[i][1] - r[i][0]

	// 				seed -= offset
	// 				altered = true
	// 			}
	// 		}

	// 		// fmt.Printf("After map %d: %d\n", ridx, seed)
	// 	}
	// 	fmt.Printf("After %d\n", seed)
	// 	if seed < lowest {
	// 		lowest = seed
	// 	}
	// }

	for i := 0; i < len(seeds_char); i += 2 {
		start, err := strconv.ParseInt(seeds_char[i], 10, 64)
		count, err := strconv.ParseInt(seeds_char[i+1], 10, 64)
		if err != nil {
			panic(err)
		}
		for x := int64(0); x < count; x++ {
			res := ex02_run(ranges, start+x)
			if res < lowest {
				lowest = res
			}
		}
		println("new seeds")
	}

	println(lowest)
}

func main() {
	ex02()
}
