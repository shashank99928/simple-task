import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import type { Task } from "../../types";
import { formatDate } from "../../utils";



const TaskDetail = ({ task }: { task: Task }) => {
    const { title, description, completed, createdAt } = task;

    return (
        <Box>
            <Divider sx={{ my: 2 }} />
            <Box role="list" aria-label="Item Details">
                <Box role="listitem" aria-label={`Name: ${title}`} sx={{ mb: 2 }}>
                    <Typography variant="overline" color="text.secondary" aria-hidden="true">
                        Name
                    </Typography>
                    <Typography variant="body1">{title}</Typography>
                </Box>

                <Box role="listitem" aria-label={`Description: ${description}`} sx={{ mb: 2 }}>
                    <Typography variant="overline" color="text.secondary" aria-hidden="true">
                        Description
                    </Typography>
                    <Typography variant="body1">{description}</Typography>
                </Box>

                <Box role="listitem" aria-label={`Status: ${completed ? 'Completed' : 'Not Completed'}`} sx={{ mb: 2 }}>
                    <Typography variant="overline" color="text.secondary" aria-hidden="true">
                        Status
                    </Typography>
                    <Typography variant="body1">
                        {completed ? 'Completed' : 'Not Completed'}
                    </Typography>
                </Box>

                <Box role="listitem" aria-label={`Created At: ${formatDate(createdAt)}`}>
                    <Typography variant="overline" color="text.secondary" aria-hidden="true">
                        Created At
                    </Typography>
                    <Typography variant="body1">{formatDate(createdAt)}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default TaskDetail;