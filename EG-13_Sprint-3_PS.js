// Solution 1: Contains Duplicate
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
	return new Set(nums).size !== nums.length;
};

// Solution 2: Move Zeroes
/**
 * @param {number[]} nums
 * @return {void} 
 */
var moveZeroes = function(nums) {
	var nextNonZero = 0;

	for (var index = 0; index < nums.length; index += 1) {
		if (nums[index] !== 0) {
			nums[nextNonZero] = nums[index];
			nextNonZero += 1;
		}
	}

	while (nextNonZero < nums.length) {
		nums[nextNonZero] = 0;
		nextNonZero += 1;
	}
};

// Solution 3: Valid Anagram
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
	if (s.length !== t.length) {
		return false;
	}

	var counts = new Map();

	for (var index = 0; index < s.length; index += 1) {
		counts.set(s[index], (counts.get(s[index]) || 0) + 1);
		counts.set(t[index], (counts.get(t[index]) || 0) - 1);
	}

	for (var count of counts.values()) {
		if (count !== 0) {
			return false;
		}
	}

	return true;
};

// Solution 4: Ransom Note
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
	var counts = new Map();

	for (var character of magazine) {
		counts.set(character, (counts.get(character) || 0) + 1);
	}

	for (var noteCharacter of ransomNote) {
		var remaining = counts.get(noteCharacter) || 0;
		if (remaining === 0) {
			return false;
		}
		counts.set(noteCharacter, remaining - 1);
	}

	return true;
};

// Solution 5: Majority Element
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
	var candidate = null;
	var votes = 0;

	for (var number of nums) {
		if (votes === 0) {
			candidate = number;
		}
		votes += number === candidate ? 1 : -1;
	}

	return candidate;
};

// Solution 6: 3Sum
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
	nums.sort(function(a, b) { return a - b; });
	var triplets = [];

	for (var index = 0; index < nums.length - 2; index += 1) {
		if (index > 0 && nums[index] === nums[index - 1]) {
			continue;
		}

		var left = index + 1;
		var right = nums.length - 1;

		while (left < right) {
			var sum = nums[index] + nums[left] + nums[right];

			if (sum === 0) {
				triplets.push([nums[index], nums[left], nums[right]]);
				left += 1;
				right -= 1;

				while (left < right && nums[left] === nums[left - 1]) {
					left += 1;
				}
				while (left < right && nums[right] === nums[right + 1]) {
					right -= 1;
				}
			} else if (sum < 0) {
				left += 1;
			} else {
				right -= 1;
			}
		}
	}

	return triplets;
};

// Solution 7: Subarray Sum Equals K
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
	var prefixCounts = new Map([[0, 1]]);
	var prefixSum = 0;
	var total = 0;

	for (var number of nums) {
		prefixSum += number;
		total += prefixCounts.get(prefixSum - k) || 0;
		prefixCounts.set(prefixSum, (prefixCounts.get(prefixSum) || 0) + 1);
	}

	return total;
};

// Solution 8: Top K Frequent Elements
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
	var counts = new Map();

	for (var number of nums) {
		counts.set(number, (counts.get(number) || 0) + 1);
	}

	return Array.from(counts.entries())
		.sort(function(first, second) { return second[1] - first[1]; })
		.slice(0, k)
		.map(function(entry) { return entry[0]; });
};

// Solution 9: Longest Consecutive Sequence
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
	var values = new Set(nums);
	var longest = 0;

	for (var number of values) {
		if (!values.has(number - 1)) {
			var length = 1;
			while (values.has(number + length)) {
				length += 1;
			}
			longest = Math.max(longest, length);
		}
	}

	return longest;
};

// Solution 10: Sort Colors
/**
 * @param {number[]} nums
 * @return {void} 
 */
var sortColors = function(nums) {
	var low = 0;
	var current = 0;
	var high = nums.length - 1;

	while (current <= high) {
		if (nums[current] === 0) {
			[nums[low], nums[current]] = [nums[current], nums[low]];
			low += 1;
			current += 1;
		} else if (nums[current] === 2) {
			[nums[current], nums[high]] = [nums[high], nums[current]];
			high -= 1;
		} else {
			current += 1;
		}
	}
};
