package main

import (
	"os"
	"strings"
)

func ex01() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")
	numbers := []int{}

	for i := 0; i < len(lines); i++ {
		first_num := -1
		last_num := -1
		for _, c := range lines[i] {
			if c >= 48 && c <= 57 {
				if first_num == -1 {
					first_num = int(c - 48)
				}
				last_num = int(c - 48)
			}
		}

		total := first_num*10 + last_num

		println(first_num)

		numbers = append(numbers, total)
	}

	total := 0

	for _, num := range numbers {
		total += num
	}

	print(total)
}

func ex02() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	strnums := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"}

	lines := strings.Split(string(dat), "\n")
	numbers := []int{}

	for i := 0; i < len(lines); i++ {
		first_num := -1
		last_num := -1

		for lineidx, _ := range lines[i] {
			for numidx, strnum := range strnums {
				result := strings.Index(lines[i][lineidx:], strnum)

				if result != 0 {
					continue
				}

				if first_num == -1 {
					first_num = numidx%9 + 1
				}
				last_num = numidx%9 + 1
				break
			}
		}

		if first_num == -1 {
			panic("NOFIRST")
		}
		if last_num == -1 {
			panic("NOLAST")
		}

		total := first_num*10 + last_num

		println(first_num, last_num)

		numbers = append(numbers, total)

	}

	total := 0

	for _, num := range numbers {
		total += num
	}

	print(total)
}

func main() {
	ex02()
}
