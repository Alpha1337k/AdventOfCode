package main

import (
	"math"
	"os"
	"strconv"
	"strings"
)

func ex01() {
	dat, err := os.ReadFile("test.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")
	times := strings.Fields(lines[0][6:])
	distances := strings.Fields(lines[1][10:])

	races := [][2]int{}

	for i, time := range times {
		println(time)
		t, err := strconv.Atoi(time)
		if err != nil {
			panic(err)
		}
		d, err := strconv.Atoi(distances[i])
		if err != nil {
			panic(err)
		}

		races = append(races, [2]int{t, d})
	}

	total := []int{}

	for _, race := range races {
		println(race[0], race[1])

		total_race := 0

		for i := 0; i < race[1]; i++ {
			travel_len := i * (race[0] - i)
			if travel_len < 0 {
				travel_len = 0
			}

			if travel_len > race[1] {
				total_race++
			}
		}
		total = append(total, total_race)
	}

	result := 1
	for _, t := range total {
		println("R: ", t)
		result *= t
	}

	println(result)
}

func ex02() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")
	time, err := strconv.Atoi(strings.Join(strings.Fields(lines[0][6:]), ""))
	if err != nil {
		panic(err)
	}

	println(time)

	distance, err := strconv.Atoi(strings.Join(strings.Fields(lines[1][10:]), ""))
	if err != nil {
		panic(err)
	}

	race := [2]int{time, distance}

	iterator_idx := race[0] / 2
	iterator_size := int(math.Round(float64(race[0]) / 4))

	edge_end := -1
	edge_start := -1

	// for i := 0; i < race[1]; i++ {
	// 	travel_len := i * (race[0] - i)
	// 	println(travel_len >= race[1])
	// }

	// return

	// max := 100
	// count := 0

	for edge_end == -1 {
		travel_len := iterator_idx * (race[0] - iterator_idx)
		travel_len_r := (iterator_idx + 1) * (race[0] - (iterator_idx + 1))

		println("R", iterator_idx, iterator_size, travel_len >= race[1], travel_len_r < race[1])

		if travel_len >= race[1] && travel_len_r < race[1] {
			edge_end = iterator_idx
		} else if travel_len < race[1] {
			iterator_idx -= iterator_size
			if iterator_size > 1 {
				iterator_size /= 2
			}
		} else {
			iterator_idx += iterator_size
			if iterator_size > 1 {
				iterator_size /= 2
			}
		}
		// count++
		// if count > max {
		// 	break
		// }
	}

	iterator_size = int(math.Round(float64(edge_end) / 2))
	iterator_idx = edge_end

	for edge_start == -1 {
		travel_len := iterator_idx * (race[0] - iterator_idx)
		travel_len_l := (iterator_idx - 1) * (race[0] - (iterator_idx - 1))

		println("L", iterator_idx, iterator_size, travel_len >= race[1], travel_len_l < race[1])

		if travel_len >= race[1] && travel_len_l < race[1] {
			edge_start = iterator_idx
		} else if travel_len < race[1] {
			iterator_idx += iterator_size
			if iterator_size > 1 {
				iterator_size /= 2
			}
		} else {
			iterator_idx -= iterator_size
			if iterator_size > 1 {
				iterator_size /= 2
			}
		}
	}

	result := edge_end - edge_start + 1

	println("RES", result, edge_end, edge_start)
}

func main() {
	ex02()
}
