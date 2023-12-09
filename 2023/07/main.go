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

	instructions := lines[0]

	routes := make(map[string][]string)

	for _, line := range lines[2:] {
		name := line[0:3]
		left := line[7:10]
		right := line[12:15]

		println(name, left, right)

		routes[name] = []string{left, right}
	}

	index := "AAA"
	instruction_idx := 0

	steps := 0

	for index != "ZZZ" {
		instruction := instructions[instruction_idx%len(instructions)]

		instruction_idx++

		println(index, string(instruction))

		if instruction == 'L' {
			index = routes[index][0]
		} else {
			index = routes[index][1]
		}

		steps++
	}

	println(steps)
}

func GCDRemainder(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}

	return a
}

func ex02() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	instructions := lines[0]

	routes := make(map[string][]string)

	for _, line := range lines[2:] {
		name := line[0:3]
		left := line[7:10]
		right := line[12:15]

		// println(name, left, right)

		routes[name] = []string{left, right}
	}

	indices := []string{}
	instruction_idx := 0

	for name := range routes {
		if name[2] == 'A' {
			indices = append(indices, name)
		}
	}

	steps := 0
	total := 1

	counts := []int{}

	for i := 0; i < len(indices); i++ {
		index := indices[i]
		instruction_idx = 0
		steps = 0
		offset := -1

		visited_nodes_count := make(map[string]int)

		for {
			instruction := instructions[instruction_idx%len(instructions)]

			visited_nodes_count[index]++

			if index[2] == 'Z' {
				println("Repetition after", steps, indices[i])

				if visited_nodes_count[index] == 1 {
					offset = steps
					break
				}
			}

			if instruction == 'L' {
				index = routes[index][0]
			} else {
				index = routes[index][1]
			}

			instruction_idx++
			steps++
		}

		counts = append(counts, offset)

	}

	for i := 0; i < len(counts); i++ {
		println(counts[i])
		total = counts[i] * total / GCDRemainder(counts[i], total)
	}

	println(total)
}

func main() {
	ex02()
}
