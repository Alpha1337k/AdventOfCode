package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func has_adjacent(lines []string, pos_y int, start_x int, x_len int) bool {
	for y := -1; y < 2; y++ {
		if pos_y+y < 0 || y+pos_y >= len(lines) {
			continue
		}
		for x := -1; x < int(x_len)+1; x++ {
			if start_x+x < 0 || start_x+x >= len(lines[y+pos_y]) {
				continue
			}

			// if y == 0 && x != int(x_len)+1 {
			// 	continue
			// }

			// println(y+pos_y, x+start_x, string(lines[y+pos_y][x+start_x]))

			// println(lines[y+pos_y][x+start_x])
			if lines[y+pos_y][x+start_x] != '.' &&
				(lines[y+pos_y][x+start_x] < '0' || lines[y+pos_y][x+start_x] > '9') {
				return true
			}
		}
	}
	return false
}

func has_adjacent_ex02(lines []string, pos_y int, start_x int, x_len int, geared map[string][]int, num int) map[string][]int {
	for y := -1; y < 2; y++ {
		if pos_y+y < 0 || y+pos_y >= len(lines) {
			continue
		}
		for x := -1; x < int(x_len)+1; x++ {
			if start_x+x < 0 || start_x+x >= len(lines[y+pos_y]) {
				continue
			}

			// if y == 0 && x != int(x_len)+1 {
			// 	continue
			// }

			// println(y+pos_y, x+start_x, string(lines[y+pos_y][x+start_x]))

			// println(lines[y+pos_y][x+start_x])
			if lines[y+pos_y][x+start_x] == '*' {
				key := fmt.Sprintf("%dx%d", y+pos_y, x+start_x)

				geared[key] = append(geared[key], int(num))

			}
		}
	}
	return geared
}

func getLastNotIn(str string, notIn string) int {
	for idx, c := range str {
		if strings.Index(notIn, string(c)) == -1 {
			return idx
		}
	}
	return len(str)
}

func ex01() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	total := 0

	for i := 0; i < len(lines); i++ {
		for x := 0; x < len(lines[i]); x++ {
			if lines[i][x] >= '0' && lines[i][x] <= '9' {
				num_len := getLastNotIn(lines[i][x:], "0123456789")
				if num_len == -1 {
					num_len = len(lines[i])
				}

				val := lines[i][x : num_len+x]

				num, err := strconv.ParseInt(val, 10, 32)
				if err != nil {
					panic(err)
				}

				if has_adjacent(lines, i, x, (num_len)) {
					println(num)
					total += int(num)
				}

				x += (num_len)
			}
			// break
		}
		// break
	}
	println(total)
}

func ex02() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	geared := make(map[string][]int)

	total := 0

	for i := 0; i < len(lines); i++ {
		for x := 0; x < len(lines[i]); x++ {
			if lines[i][x] >= '0' && lines[i][x] <= '9' {
				num_len := getLastNotIn(lines[i][x:], "0123456789")
				if num_len == -1 {
					num_len = len(lines[i])
				}

				val := lines[i][x : num_len+x]

				num, err := strconv.ParseInt(val, 10, 32)
				if err != nil {
					panic(err)
				}

				geared = has_adjacent_ex02(lines, i, x, (num_len), geared, int(num))

				x += (num_len)
			}
			// break
		}
		// break
	}

	for str, key := range geared {
		print(str, " | ")
		for _, v := range key {
			print(v, ", ")
		}
		println("")

		if len(key) == 2 {
			println(len(key), key[0], key[1])
			total += key[0] * key[1]
		}
	}

	println(total)
}

func main() {
	ex02()
}

// 530977
