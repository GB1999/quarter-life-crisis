import os

# Define the root directory where your image sequences are located
root_directory = 'B:\Coding Projects\React\quarter-life-crisis\public\images'

# Loop through all subdirectories in the root directory
for subdirectory in os.listdir(root_directory):
    subdirectory_path = os.path.join(root_directory, subdirectory)
    if os.path.isdir(subdirectory_path):
        # Loop through all files in the subdirectory
        for filename in os.listdir(subdirectory_path):
            if filename.endswith(").png"):
                # Extract the number from the filename
                number = filename.split("(")[1].split(")")[0]
                # Create the new filename
                new_filename = f"{subdirectory}_{number}.png"
                # Rename the file
                os.rename(os.path.join(subdirectory_path, filename), os.path.join(subdirectory_path, new_filename))

print("Files have been renamed successfully!")
