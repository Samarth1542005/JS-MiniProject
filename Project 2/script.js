let selectedGender = null;

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const calculateBtn = document.getElementById("calculateBtn");
const resultSection = document.getElementById("resultSection");
const bmiValue = document.getElementById("bmiValue");
const bmiCategory = document.getElementById("bmiCategory");
const feedback = document.getElementById("feedback");
const bmiPointer = document.getElementById("bmiPointer");
const maleCard = document.getElementById("maleCard");
const femaleCard = document.getElementById("femaleCard");

// ─── Gender Selection ───
function selectGender(gender) {
    selectedGender = gender;
    maleCard.classList.remove("active-male");
    femaleCard.classList.remove("active-female");

    if (gender === "male") {
        maleCard.classList.add("active-male");
    } else {
        femaleCard.classList.add("active-female");
    }
}

// ─── BMI Calculation ───
calculateBtn.addEventListener("click", calculateBMI);

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") calculateBMI();
});

function calculateBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    // Validation
    if (!selectedGender) {
        alert("Please select your gender first!");
        return;
    }
    if (!height || !weight || height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight values!");
        return;
    }

    // BMI Formula: weight (kg) / height (m)^2
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(1);

    // Display BMI value
    bmiValue.textContent = bmiRounded;

    // Remove previous category classes
    bmiCategory.classList.remove("underweight", "normal", "overweight", "obese");

    // Gender-specific BMI thresholds
    // Men: Underweight <20, Normal 20-25, Overweight 25-30, Obese 30+
    // Women: Underweight <18.5, Normal 18.5-24, Overweight 24-30, Obese 30+
    let category, feedbackText, emoji;

    if (selectedGender === "male") {
        if (bmi < 20) {
            category = "Underweight";
            bmiCategory.classList.add("underweight");
            emoji = "🍗";
            feedbackText = `Time to bulk up, bro! You're underweight — load up on proteins like chicken, eggs, paneer, and nuts. Hit the gym, lift heavy, and eat 5-6 meals a day. Your body needs fuel, so eat big and grow strong! 💪🏋️‍♂️`;
        } else if (bmi >= 20 && bmi < 25) {
            category = "Normal";
            bmiCategory.classList.add("normal");
            emoji = "✅";
            feedbackText = `King, you're in the perfect zone! 👑 Your BMI is absolutely ideal. Keep hitting the gym, eating clean, and staying consistent. Balanced diet + good sleep = unstoppable you. You're crushing it, champ! 🎯💚`;
        } else if (bmi >= 25 && bmi < 30) {
            category = "Overweight";
            bmiCategory.classList.add("overweight");
            emoji = "⚠️";
            feedbackText = `Heads up, brother! You're carrying some extra weight. Time to ditch the junk food and sugary drinks. Start with 30 mins of running daily, do some HIIT workouts, eat more veggies and lean protein. Small changes = big results! 🏃‍♂️🥦`;
        } else {
            category = "Obese";
            bmiCategory.classList.add("obese");
            emoji = "🚨";
            feedbackText = `Real talk, brother — it's time to start dieting! 🚨 Cut the processed food, say goodbye to late-night snacking, and GET MOVING. Start slow with brisk walks, then level up to full workouts. Consult a doctor if needed. You got this — every rep counts! 🥗💪`;
        }
    } else {
        // Female
        if (bmi < 18.5) {
            category = "Underweight";
            bmiCategory.classList.add("underweight");
            emoji = "🍎";
            feedbackText = `Hey girl, you need to nourish your body more! 🌸 You're underweight — focus on healthy fats like avocado, nuts, and olive oil. Add protein-rich foods like eggs, Greek yogurt, and lentils. Your body is your temple, feed it well! 💖🥑`;
        } else if (bmi >= 18.5 && bmi < 24) {
            category = "Normal";
            bmiCategory.classList.add("normal");
            emoji = "✅";
            feedbackText = `Queen, you're absolutely glowing! 👸✨ Your BMI is in the perfect healthy range. Keep up the balanced lifestyle — nutritious meals, regular exercise, and self-care. You're doing amazing, keep shining! 💚🧘‍♀️`;
        } else if (bmi >= 24 && bmi < 30) {
            category = "Overweight";
            bmiCategory.classList.add("overweight");
            emoji = "⚠️";
            feedbackText = `Hey beautiful, a little heads up! 💛 You're slightly over the ideal range. Try incorporating more whole foods, cut down on sugary treats, and find an exercise you love — yoga, dancing, or swimming work wonders! Stay hydrated and be patient with yourself. 🏊‍♀️🥗`;
        } else {
            category = "Obese";
            bmiCategory.classList.add("obese");
            emoji = "🚨";
            feedbackText = `Girl, it's time for a healthy reset! 💪 Start with small steps — swap sodas for water, add a 20-min walk daily, and load up on veggies and lean protein. No crash diets! Consistency beats perfection. Talk to a nutritionist if needed. You're worth the effort! 🌟🥗`;
        }
    }

    bmiCategory.textContent = category;
    feedback.innerHTML = `<span class="emoji">${emoji}</span>${feedbackText}`;

    // Position BMI pointer on scale (0 to 40 range)
    const clampedBmi = Math.min(Math.max(bmi, 0), 40);
    const pointerPercent = (clampedBmi / 40) * 100;
    bmiPointer.style.left = pointerPercent + "%";

    // Show result with animation
    resultSection.style.display = "none";
    void resultSection.offsetWidth;
    resultSection.style.display = "block";
}
